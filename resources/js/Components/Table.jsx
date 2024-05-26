import { Box, Button, Flex, Table as MantineTable, Text } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

export const Table = (props) => {
  return (
    <Box
      p={props.tdList.length ? 0 : 32}
      style={{
        backgroundColor: 'var(--mantine-color-netral-10)',
        borderRadius: 20,
        border: props.tdList.length && '1px solid #E0E0E0',
      }}
    >
      {
        props.tdList.length ?
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
              </MantineTable.Tbody>
            </MantineTable>
          </MantineTable.ScrollContainer>
          : (
            <Flex justify="center" align="center" direction="column">
              <IconUser
                size={48}
                style={{
                  color: 'var(--mantine-color-netral-5)',
                  marginBottom: 8,
                }}
              />
              
              <Text mb={16} fw="bold">Tidak ada pelatih</Text>
              
              <Button
                variant="subtle"
                color="gold.1"
                radius={32}
                h={48}
                p={16}
                fw="bold"
              >
                Tambah Atlet
              </Button>
            </Flex>
          )
      }
    
    
    </Box>
  )
}
