import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { StyledSection, Styledarrows, Styledimage } from './styles';
import * as ArrowLeftIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-micro-left.icon';
import * as ArrowRightIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/arrow-micro-right.icon';
import { registerIcon, Icon, Button } from '@pega/cosmos-react-core';
import StyledFusionAixComponentsFxSliderImgWrapper from './styles';

// Duplicated runtime code from React SDK

// Page Case Widget example

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function FusionAixComponentsFxSliderImg(props) {
  registerIcon(ArrowLeftIcon);
  registerIcon(ArrowRightIcon);

  const {
    DataPageName,
    PropertyURL,
    height,
    width,
    numberOfparameters,
    paramslabel1,
    paramslabel2,
    paramsvalue1,
    paramsvalue2,
    paramslabel3,
    paramsvalue3,
    isNewwindow
  } = props;
  const [current, setCurrent] = useState(0);
  const [options, setoptions] = useState([]);
  const length = options.length;
  let payload;
  switch (numberOfparameters) {
    case 'Two':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1,
          [paramslabel2]: paramsvalue2
        }
      };
      break;
    case 'Three':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1,
          [paramslabel2]: paramsvalue2,
          [paramslabel3]: paramsvalue3
        }
      };
      break;
    default:
    case 'One':
      payload = {
        dataViewParameters: {
          [paramslabel1]: paramsvalue1
        }
      };
      break;
  }

  useEffect(() => {
    PCore.getDataApiUtils()
      .getData(DataPageName, payload)
      .then(response => {
        const arr = [];
        console.log("response", response);
        response.data.data.map((ele, index) => {
          arr.push(ele[`${PropertyURL}`]);
        });
        setoptions(arr);
      })
      .catch(error => {
        console.log('error of sliderimage', error);
      });
  }, [PropertyURL]);
  console.log("Image url after useeffect", options);
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <StyledSection>
      <div className='sliderImage_images'>
        {options.map((slide, index) => {
          // console.log(slide, index);
          return (
            // <Styledimage>
            <div className={index === current ? 'slide active' : 'slide'} key={index}>

              {index === current && (
                <div style={{ position: 'relative' }}>
                  <img
                    src={slide}
                    alt='travel image'
                    style={{
                      width: width + '%',
                      height: height + '%',
                      borderRadius: '10px',
                      objectFit: 'cover'
                    }}
                  />
                  {isNewwindow && (
                    <a href={slide} target="_blank" className='viewIcon' style={{ position: 'absolute', right: '10px', top: '10px', background: '#f4eded87', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50px' }}>
                      <svg style={{ width: '15px' }} viewBox="0 0 1024 1024" class="sto-ha8kg"><path d="M130 85h332a45 45 0 0 1 8 89l-8 1H175v674h674V557a45 45 0 0 1 89-8l1 8v337c0 22-16 40-37 44l-8 1H130c-22 0-40-16-44-37l-1-8V130c0-22 16-40 37-44l8-1h332-332zm555 0h210l5 1-6-1a45 45 0 0 1 32 13l-5-4 3 3 2 1a46 46 0 0 1 12 24v2l1 5v209a45 45 0 0 1-89 8l-1-8V238L544 544a45 45 0 0 1-57 5l-7-5a45 45 0 0 1 0-64l306-305H685a45 45 0 0 1-8-89l8-1h209-209z" class="sto-kqzqgg"></path></svg>
                    </a>)}

                </div>
              )}
            </div>
            // </Styledimage>
          );
        })}
        <Styledarrows>
          <Button onClick={prevSlide} variant='text'>
            <Icon
              name='arrow-micro-left'
              aria-label='arrow-micro-left'
            />
          </Button>
          <Button onClick={nextSlide} variant='text'>
            <Icon
              name='arrow-micro-right'
              aria-label='arrow-micro-right'
            />
          </Button>
        </Styledarrows>
      </div>
    </StyledSection>
  );


}
