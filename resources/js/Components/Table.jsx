import { ActionIcon, Box, Button, Flex, Table as MantineTable, Text, Tooltip } from '@mantine/core'
import { IconArrowsDownUp, IconPlus } from '@tabler/icons-react'
import { router } from '@inertiajs/core'
import { useToggle } from '@mantine/hooks'
import { useEffect, useState } from 'react'

export const Table = (props) => {
  const [value, toggle] = useToggle(['default', 'asc', 'desc'])
  const [activeTHSort, setActiveTHSort] = useState('')
  
  useEffect(() => {
    // Ensure there's a column to sort by and the sort order is not 'default'
    if (activeTHSort && value !== 'default') {
      const sortedData = [...props.data].sort((a, b) => {
        if (value === 'asc') {
          return a[activeTHSort].localeCompare(b[activeTHSort])
        } else if (value === 'desc') {
          return b[activeTHSort].localeCompare(a[activeTHSort])
        }
        return 0
      })
      
      // Assuming props.handleSort is a method passed from the parent component to handle the sorted data
      props.handleSort(sortedData)
    }
  }, [activeTHSort, value, props.data])
  
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
                      <Flex align="center" justify="space-between" gap={16}>
                        <Text>
                          {th.title}
                        </Text>
                        
                        {(th.title !== '#' && th.title !== 'Aksi' && th.title !== 'Foto' && th.title !== 'Atlet' && th.title !== 'Pelatih') && (
                          <Tooltip label={`Urutkan ${th.title.toLowerCase()} ${value === 'default' ? '' : value === 'asc' ? '(naik)' : '(turun)'}`}>
                            <ActionIcon
                              onClick={() => {
                                setActiveTHSort(th.key)
                                toggle()
                              }}
                              color="gold.2"
                              size={48} radius={32} variant="subtle"
                              // aria-label={action.label} color={action.color}
                              // onClick={() => action.onClick(athlete)}
                              // disabled={props.auth.user.id === athlete.id || action.disabled}
                            >
                              <IconArrowsDownUp />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Flex>
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
                
                {props.authed?.role.includes('Pelatih') && props.route && (
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
