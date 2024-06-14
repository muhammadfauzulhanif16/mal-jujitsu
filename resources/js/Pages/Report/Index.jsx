import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Box, Button, Flex, Grid, Group, SimpleGrid, Stack, Table as MantineTable, Text, Tooltip } from '@mantine/core'
import { IconCalendar, IconEye, IconPrinter } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { MonthPickerInput } from '@mantine/dates'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log(props)
  // console.log('evaluation', props)
  const [reportSearch, setReportSearch] = useState('')
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Sistem Pertandingan', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Laporan',
      icon: <IconEye />,
      onClick: (report) => router.get(route('reports.show', report.user)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    // {
    //   label: 'Ubah Penilaian',
    //   icon: <IconPencil />,
    //   onClick: (report) => router.get(route('evaluations.edit', report)),
    //   color: 'yellow',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
    // {
    //   label: 'Hapus Penilaian',
    //   icon: <IconTrash />,
    //   onClick: (report) => router.delete(route('evaluations.destroy', report)),
    //   color: 'red',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
  ]
  // const reportList = props.reports.filter((report) => {
  //   return report.exercise.name.toLowerCase().includes(reportSearch.toLowerCase())
  // })
  const TDList = props.reports.map((report, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar src={report.user.avatar} alt={report.user.full_name} />
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{report.user.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{report.user.role}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{
              borderRadius: 32,
              padding: '.5rem 1rem',
            }}>
              <ActionIcon size={48} radius={32} variant="subtle"
                          aria-label={action.label} color={action.color}
                          onClick={() => action.onClick(report)}
                          disabled={action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Laporan" authed={props.auth.user} meta={props.meta}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Laporan' }]} />
          
          <Group>
            <MonthPickerInput
              display={{ base: 'none', xs: 'block' }} w={240}
              leftSection={<IconCalendar />}
              // label="Pick date"
              placeholder="Pilih waktu..."
              variant="filled"
              // value={value}
              // onChange={setValue}
              styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
                calendarHeader: { height: 48 },
                calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
              }}
            />
            
            {['Ne-Waza', 'Fighting'].includes(props.auth.user.role) && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Cetak">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => window.print()}>
                    <IconPrinter />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPrinter />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => window.print()}>
                  Cetak
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <MonthPickerInput
          w="100%"
          display={{ base: 'block', xs: 'none' }}
          leftSection={<IconCalendar />}
          // label="Pick date"
          placeholder="Pilih waktu..."
          variant="filled"
          // value={value}
          // onChange={setValue}
          styles={{
            label: { marginBottom: 8 },
            input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
            section: { marginLeft: 0, width: 48, height: 48 },
            error: { marginTop: 8 },
            calendarHeader: { height: 48 },
            calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
          }}
        />
      </Stack>
      
      {!['Ne-Waza', 'Fighting'].includes(props.auth.user.role) ? (<Table thList={THList} tdList={TDList} />) : (
        <Stack gap={80}>
          <Grid align="center">
            <Grid.Col span={4}>
              <Avatar src={props.auth.user.avatar}
                      alt={props.auth.user.full_name}
                      size={160} />
            </Grid.Col>
            
            <Grid.Col span={8}>
              <SimpleGrid cols={2}>
                <Text>Nama Lengkap : <Text fw={600}>{props.auth.user.full_name}</Text></Text>
                <Text>Jenis Kelamin :<Text fw={600}>{props.auth.user.gender}</Text></Text>
                <Text>Tanggal Lahir :<Text fw={600}>{props.auth.user.birth_date}</Text></Text>
                <Text>Alamat Surel :<Text fw={600}>{props.auth.user.email}</Text></Text>
                <Text>Sistem Pertandingan :<Text fw={600}>{props.auth.user.role}</Text></Text>
                <Text>Berat Badan :<Text fw={600}>{props.auth.user.athlete.weight} kg</Text></Text>
              </SimpleGrid>
            </Grid.Col>
          </Grid>
          
          <Box bg="red">asdasdasd</Box>
        
        </Stack>
      )}
    
    </AppLayout>
  )
}

export default Index
