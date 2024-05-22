import { Box, Table as MantineTable } from '@mantine/core'

export const Table = (props) => {
  return (
    <Box style={{
      borderRadius: 16,
      border: '1px solid #E0E0E0',
    }}>
      <MantineTable.ScrollContainer>
        <MantineTable
          styles={{
            table: {
              // borderCollapse: 'collapse',
              // border: '1px solid #E0E0E0',
              borderRadius: 16,
              // backgroundColor: 'red',
            },
            thead: {
              borderRadius: 16,
              // backgroundColor: 'red',
            },
          }}>
          <MantineTable.Thead h={48}>
            <MantineTable.Tr>
              <MantineTable.Th>Element position</MantineTable.Th>
              <MantineTable.Th>Element name</MantineTable.Th>
              <MantineTable.Th>Symbol</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
              <MantineTable.Th>Atomic mass</MantineTable.Th>
            </MantineTable.Tr>
          </MantineTable.Thead>
          
          <MantineTable.Tbody>
            <MantineTable.Tr h={48}>
              <MantineTable.Td>asdasd</MantineTable.Td>
              {/*<MantineTable.Td>{element.name}</MantineTable.Td>*/}
              {/*<MantineTable.Td>{element.symbol}</MantineTable.Td>*/}
              {/*<MantineTable.Td>{element.mass}</MantineTable.Td>*/}
            </MantineTable.Tr>
            
            <MantineTable.Tr h={48}>
              <MantineTable.Td>asdasd</MantineTable.Td>
              {/*<MantineTable.Td>{element.name}</MantineTable.Td>*/}
              {/*<MantineTable.Td>{element.symbol}</MantineTable.Td>*/}
              {/*<MantineTable.Td>{element.mass}</MantineTable.Td>*/}
            </MantineTable.Tr>
          </MantineTable.Tbody>
        </MantineTable>
      </MantineTable.ScrollContainer>
    </Box>
  )
}
