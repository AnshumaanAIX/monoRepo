
import React, { useCallback, useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import { useTheme } from '@pega/cosmos-react-core';

const Signature = (props) => {
  const refCanvas = useRef(null);
  const refSignaturePad = useRef();
  const { signaturePadRef, canvasProps, onEndStroke } = props;
  const theme = useTheme();
  const clearCanvas = () => {
    return refSignaturePad?.current?.clear();
  };

  const resizeCanvas = useCallback(() => {
    if (refCanvas?.current) {
      const canvas = refCanvas.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refCanvas.current]);

  useEffect(() => {
    const initSignaturePad = () => {
      resizeCanvas();
      return refSignaturePad?.current?.on();
    };

    const stopSignaturePad = () => {
      window.removeEventListener('resize', resizeCanvas);
      clearCanvas();
      return refSignaturePad?.current?.off();
    };

    const canvas = refCanvas?.current;
    if (!canvas) return;

    const signaturePad = new SignaturePad(canvas, {
      penColor: theme.base.palette['foreground-color']
    });
    refSignaturePad.current = signaturePad;
    if (signaturePadRef) {
      signaturePadRef.current = signaturePad;
    }
    if (onEndStroke) {
      signaturePad.addEventListener('endStroke', () => {
        onEndStroke();
      });
    }

    initSignaturePad();
    window.addEventListener('resize', resizeCanvas);
    return () => stopSignaturePad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={refCanvas} {...canvasProps} />;
};

export default Signature;
