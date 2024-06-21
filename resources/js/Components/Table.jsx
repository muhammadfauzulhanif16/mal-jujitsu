import { Box, Button, Flex, Table as MantineTable, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { router } from '@inertiajs/core'

export const Table = (props) => {
  return (
    <Box
      p={props.tdList.length ? 0 : 64}
      style={{
        borderRadius: 20,
        border: props.tdList.length && '1px solid #E0E0E0',
      }}>
      {
        props.tdList.length ?
          <MantineTable.ScrollContainer>
            <MantineTable
              highlightOnHover withColumnBorders
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
              <MantineTable.Thead h={64}>
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
            <>

              <Flex justify="center" align="center" direction="column" c="neutral.5">
                {props.icon}

                <Text mt={8} mb={16} fw="bold">Tidak ada {props.title}</Text>

                {props.authed.role.includes('Pelatih') && props.route && (
                  <Button
                    px={16} styles={{ section: { marginRight: 16 } }}
                    leftSection={<IconPlus />}
                    variant="light"
                    color="gold.1"
                    radius={32}
                    h={48}
                    p={16}
                    fw="bold"
                    onClick={() => router.get(route(props.route))}
                  >
                    Tambah {props.title}
                  </Button>
                )}
              </Flex>
            </>
          )
      }
    </Box>
  )
}
