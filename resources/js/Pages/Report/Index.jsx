import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Group, SimpleGrid, Stack, Table as MantineTable, Text, Tooltip } from '@mantine/core'
import { IconCalendar, IconEye, IconPrinter } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { MonthPickerInput } from '@mantine/dates'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  const [time, setTime] = useState(null)
  const [reportSearch, setReportSearch] = useState('')
  console.log(props)
  const evaluationList = props.exerciseEvaluations?.filter((evaluation) => {
    if (time === null) {
      return true
    }
    return new Date(evaluation.exercise.date).toLocaleDateString('id').split('/').join('-').includes(time)
  })
  const tournamentList = props.tournaments?.filter((tournament) => {
    if (time === null) {
      return true
    }
    return new Date(tournament.date).toLocaleDateString('id').split('/').join('-').includes(time)
  })
  
  const totalMedals = tournamentList.reduce((total, tournament) => {
    if (['Emas', 'Perak', 'Perunggu'].includes(tournament.medal)) {
      return total + 1
    }
    return total
  }, 0)
  
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Sistem Pertandingan', 'Total Penilaian Latihan', 'Total Pertandingan', 'Aksi']
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
  const TDList = props.reports?.map((report, id) => (
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
        style={{ whiteSpace: 'nowrap' }}>{report.evaluations.length}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{report.tournaments.length}</MantineTable.Td>
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
          
          {['Ne-Waza', 'Fighting'].includes(props.auth.user.role) && (
            <Group>
              <MonthPickerInput
                display={{ base: 'none', xs: 'block' }} w={240}
                leftSection={<IconCalendar />}
                placeholder="Pilih waktu..."
                variant="filled"
                onChange={(value) => {
                  if (value === null) {
                    setTime(null)
                  } else {
                    const month = value.getMonth() + 1
                    const year = value.getFullYear()
                    setTime(`${month}-${year}`)
                  }
                }}
                allowDeselect
                locale="id"
                styles={{
                  label: { marginBottom: 8 },
                  input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                  section: { marginLeft: 0, width: 48, height: 48 },
                  error: { marginTop: 8 },
                  calendarHeader: { height: 48 },
                  calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                }}
              />
              
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
            </Group>
          )}
        </Group>
        
        {['Ne-Waza', 'Fighting'].includes(props.auth.user.role) && (
          <MonthPickerInput
            w="100%"
            clearable
            display={{ base: 'block', xs: 'none' }}
            leftSection={<IconCalendar />}
            placeholder="Pilih waktu..."
            variant="filled"
            onChange={(value) => {
              setMonth(month === '' ? value.getMonth() + 1 : '')
            }}
            locale="id"
            styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
              calendarHeader: { height: 48 },
              calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
            }}
          />
        )}
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
                <Box>
                  <Text>Nama Lengkap :</Text>
                  <Text fw={600}>{props.auth.user.full_name}</Text>
                </Box>
                
                <Box>
                  <Text>Jenis Kelamin :</Text>
                  <Text fw={600}>{props.auth.user.gender}</Text>
                </Box>
                
                <Box>
                  <Text>Tanggal Lahir :</Text>
                  <Text fw={600}>{new Date(props.auth.user.birth_date).toLocaleDateString('id').split('/').join('-')}</Text>
                </Box>
                
                <Box>
                  <Text>Alamat Surel :</Text>
                  <Text fw={600}>{props.auth.user.email}</Text>
                </Box>
                
                <Box>
                  <Text>Sistem Pertandingan :</Text>
                  <Text fw={600}>{props.auth.user.role}</Text>
                </Box>
                
                <Box>
                  <Text>Berat Badan :</Text>
                  <Text fw={600}>{props.auth.user.athlete.weight} kg</Text>
                </Box>
              
              </SimpleGrid>
            </Grid.Col>
          </Grid>
          
          {!!evaluationList.length && (
            <Box>
              <Divider mb={32} label="Daftar Latihan" labelPosition="center" styles={{ label: { fontSize: 14 } }} />
              
              <Stack gap={32}>
                {evaluationList.map((evaluation, evaluationId) => (
                  <Box key={evaluation.id}>
                    <Text
                      mb={16}>{evaluationId + 1}. {evaluation.exercise.name} di {evaluation.exercise.place} pada {new Date(evaluation.exercise.date).toLocaleDateString('id').split('/').join('-')}</Text>
                    
                    <Grid gutter={0}>
                      <Grid.Col span={11}>
                        <Group style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Kriteria</Group>
                      </Grid.Col>
                      
                      <Grid.Col span={1}>
                        <Center style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Nilai</Center>
                      </Grid.Col>
                      
                      {evaluation.criterias.map((criteria, criteriaId) => (
                        <>
                          <Grid.Col key={criteriaId}>
                            <Center style={{
                              border: '1px solid #e1e1e1',
                            }} px={16} h={48} fw={600}>{criteria.name.toUpperCase()}</Center>
                          </Grid.Col>
                          
                          {criteria.sub_criterias.map((sub_criteria, subCriteriaId) => {
                            const prefix = String.fromCharCode(65 + subCriteriaId)
                            return (
                              <>
                                <Grid.Col key={subCriteriaId}>
                                  <Group style={{
                                    border: '1px solid #e1e1e1',
                                  }} px={16} fw={600} h={48}>{prefix}. {sub_criteria.name}</Group>
                                </Grid.Col>
                                
                                {sub_criteria.sub_sub_criterias.map((sub_sub_criteria, subSubCriteriaId) => (
                                  <>
                                    <Grid.Col span={11} key={subSubCriteriaId}>
                                      <Group style={{
                                        border: '1px solid #e1e1e1',
                                      }} px={16} h={48}>{subSubCriteriaId + 1}. {sub_sub_criteria.name}</Group>
                                    </Grid.Col>
                                    
                                    <Grid.Col span={1}>
                                      <Group style={{
                                        border: '1px solid #e1e1e1',
                                      }} px={16} h={48}>{sub_sub_criteria.evaluation.value}</Group>
                                    </Grid.Col>
                                  </>
                                ))}
                              </>
                            )
                          })}
                          
                          {criteria.type === 'radio' && (
                            <>
                              <Grid.Col span={11}>
                                <Group style={{
                                  border: '1px solid #e1e1e1',
                                }} px={16} h={48}>Rata-rata</Group>
                              </Grid.Col>
                              
                              <Grid.Col span={1}>
                                <Group style={{
                                  border: '1px solid #e1e1e1',
                                }} px={16} h={48}>
                                  {(() => {
                                    let count = 0
                                    const sum = criteria.sub_criterias.reduce((total, sub_criteria) => {
                                      const subTotalAndCount = sub_criteria.sub_sub_criterias.reduce((accumulator, sub_sub_criteria) => {
                                        return {
                                          sum: accumulator.sum + Number(sub_sub_criteria.evaluation.value),
                                          count: accumulator.count + 1,
                                        }
                                      }, { sum: 0, count: 0 })
                                      
                                      count += subTotalAndCount.count
                                      return total + subTotalAndCount.sum
                                    }, 0)
                                    
                                    return Number((sum / count).toFixed(2))
                                  })()}
                                </Group>
                              </Grid.Col>
                            </>
                          )}
                        </>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
          
          {!!tournamentList.length && (
            <Box>
              <Divider mb={32} label="Daftar Pertandingan" labelPosition="center" styles={{ label: { fontSize: 14 } }} />
              
              <Grid gutter={0}>
                <Grid.Col span={9}>
                  <Group style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Nama Pertandingan</Group>
                </Grid.Col>
                
                <Grid.Col span={3}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Medali</Center>
                </Grid.Col>
                
                <Grid.Col span={9}>
                  <Group style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}></Group>
                </Grid.Col>
                
                <Grid.Col span={1}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Emas</Center>
                </Grid.Col>
                
                <Grid.Col span={1}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Perak</Center>
                </Grid.Col>
                
                <Grid.Col span={1}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Perunggu</Center>
                </Grid.Col>
                
                
                {tournamentList.map((tournament, tournamentId) => (
                  <>
                    <Grid.Col span={9}>
                      <Group style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48}>{tournament.name}</Group>
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                      <Center style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48}>{tournament.medal === 'Emas' ? 1 : '-'}</Center>
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                      <Center style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48}>{tournament.medal === 'Perak' ? 1 : '-'}</Center>
                    </Grid.Col>
                    
                    <Grid.Col span={1}>
                      <Center style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48}>{tournament.medal === 'Perunggu' ? 1 : '-'}</Center>
                    </Grid.Col>
                  </>
                ))}
                
                <Grid.Col span={9}>
                  <Group style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48}>Total</Group>
                </Grid.Col>
                
                <Grid.Col span={3}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48}>{totalMedals}</Center>
                </Grid.Col>
              </Grid>
            </Box>
          )}
        </Stack>
      )}
    
    </AppLayout>
  )
}

export default Index
