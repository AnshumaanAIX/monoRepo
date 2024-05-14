
import { useEffect, useMemo, useCallback } from 'react';
import {
  registerIcon,
  Icon,
  Text,
  Card,
  CardHeader,
  CardContent,
  Button,
  Configuration,
  useTheme
} from '@pega/cosmos-react-core';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
  MarkerType,

} from 'reactflow';
import dagre from 'dagre';

import StyledFusionAixComponentsFxNetworkDiagram from './styles';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import * as resetIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/reset.icon';

registerIcon(resetIcon);


const position = { x: 0, y: 0 };
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 150;
const nodeHeight = 150;

const getLayoutedElements = (nodes ,edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    };

    return node;
  });

  return { nodes, edges };
};

const edgeTypes = {
  custom: CustomEdge
};

export default function FusionAixComponentsFxNetworkDiagram(props) {
  const {
    heading = '',
    height = '40rem',
    showMinimap = true,
    showControls = true,
    showRefresh = true,
    edgePath = 'bezier',
    getPConnect,
    dataPage
  } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const theme = useTheme();

  const defaultViewport = { x: 0, y: 0, zoom: 3 };

  const getNodesDetails = useCallback(async () => {
    const initialNodes = [];
    const initialEdges = [];
    const tmpNodesHash = {};
    const data = await (window ).PCore.getDataPageUtils().getPageDataAsync(dataPage, '');
    data.pyNodes.forEach((element) => {
      tmpNodesHash[element.pyID] = element.pyLabel;
      initialNodes.push({
        id: element.pyID,
        data: {
          id: element.pyID,
          type: element.pyCategory,
          label: element.pyLabel,
          key: element.pzInsKey,
          objClass: element.pyClassName,
          getPConnect,
          theme
        },
        position,
        type: 'custom'
      });
    });
    data.pyEdges.forEach((element, i) => {
      const ariaLabel = `Relation from ${tmpNodesHash[element.pyFrom]} to ${
        tmpNodesHash[element.pyTo]
      } with label: ${element.pyLabel}`;
      initialEdges.push({
        id: element.pyID || `edge-${i}`,
        source: element.pyFrom,
        target: element.pyTo,
        data: { type: element.pyCategory, label: element.pyLabel, path: edgePath, theme },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          // color: theme.base.palette['foreground-color']
        },
        style: {
          strokeWidth: 2,
          // stroke: theme.base.palette['foreground-color']
        },
        type: 'custom',
        ariaLabel
      });
    });
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [edgePath, getPConnect, setEdges, setNodes, theme]);

  useEffect(() => {
    getNodesDetails();
  }, [height, edgePath, getNodesDetails]);

  return (
    <Configuration>
      <Card>
        <CardHeader
          actions={
            showRefresh ? (
              <Button
                variant='simple'
                label='Reload diagram'
                icon
                compact
                onClick={getNodesDetails}
              >
                <Icon name='reset' />
              </Button>
            ) : undefined
          }
        >
          <Text variant='h2'>{heading}</Text>
        </CardHeader>
        <CardContent>
          <StyledFusionAixComponentsFxNetworkDiagram height={height} theme={theme}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              defaultViewport={defaultViewport}
              proOptions={{ hideAttribution: true }}
            >
              {showMinimap ? <MiniMap /> : null}
              {showControls ? <Controls /> : null}
            </ReactFlow>
          </StyledFusionAixComponentsFxNetworkDiagram>
        </CardContent>
      </Card>
    </Configuration>
  );
}
