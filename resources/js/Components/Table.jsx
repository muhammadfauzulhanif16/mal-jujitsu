import { Box, Table as MantineTable } from '@mantine/core'

export const Table = (props) => {
  return (
    <Box style={{
      backgroundColor: 'var(--mantine-color-netral-10)',
      borderRadius: 20,
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
              {props.thList.map((th, id) => (
                <MantineTable.Th
                  key={id}
                  px={16}
                  py={0}
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {th}
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Thead>
          
          <MantineTable.Tbody>
            {props.tdList}
            {/*<MantineTable.Tr h={48}>*/}
            {/*  <MantineTable.Td>asdasd</MantineTable.Td>*/}
            {/*</MantineTable.Tr>*/}
          
          </MantineTable.Tbody>
        </MantineTable>
      </MantineTable.ScrollContainer>
    </Box>
  )
}
