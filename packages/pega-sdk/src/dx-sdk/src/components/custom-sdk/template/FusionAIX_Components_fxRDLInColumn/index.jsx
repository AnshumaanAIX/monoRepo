import PropTypes from 'prop-types';
import { Input, Label } from '@pega/cosmos-react-core';
import React, { useState, useEffect ,useRef} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StyledFusionAixComponentsFxRdlInColumnWrapper from "./styles";


export default function FusionAixComponentsFxRdlInColumn(props /* : FusionAixComponentsFxRdlInColumnProps */) {
  const { getPConnect, isHidden, children ,referenceList , setRefresh } = props;
  const [options, setoptions] = useState([])
  const [elements, setelements] = useState([])
  const [elementsValue, setelementsValue] = useState([])
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const propName = pConn?.getStateProps()?.value;
  const cosmosTableRef = useRef();
  console.log(props,"propspropsRDLin");
  const region = children[0] ? children[0].props.getPConnect() : [];
   console.log(children, cosmosTableRef , props,"RDLincolum")
  useEffect(() => {
    console.log(children,"inuseffect")
    // cosmosTableRef.current.refreshView();

  }, [referenceList])
  useEffect(() => {
    const elms = [];
    const elmsVal = [];
    const topChildren = getPConnect().getChildren()

    topChildren.forEach(topChild => {
      const region = topChild.getPConnect()
      if (region) {
        const arChildren = region.getChildren()
        arChildren.map((child, index) => {
          const pconn = child.getPConnect()
          const propsChild = pconn.getConfigProps()
          console.log(propsChild, "propsChild.label")
          elms.push(propsChild)
        })
      }
    })
    setoptions(elms)

  }, [setRefresh])
  const body = options?.map((item, key) => (
    <TableRow key={item?.label}>
      <TableCell style={{
        fontWeight: 600, borderRight: '1px solid lightgray', borderLeft: '1px solid lightgray',
        padding: '8px'
      }}>{key == 0 && isHidden ? '' : item?.label}</TableCell>
      {item?.value && item?.value.length && item?.value?.map((value, i) => (
        <TableCell style={{
          borderRight: '1px solid lightgray',
          padding: '8px'
        }} key={i}>{value}</TableCell>
      ))}
    </TableRow>
  ));


  return (
    <div style={{ overflow: 'auto', display: 'grid' }}>
        <TableContainer>
          <Table>
            <TableBody>{body}</TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
