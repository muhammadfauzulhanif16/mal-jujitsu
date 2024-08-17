import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  List,
  Select,
  SimpleGrid,
  Stack,
  Table as MantineTable,
  Text,
  Title,
  Tooltip,
  TypographyStylesProvider,
} from '@mantine/core'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'
import { router } from '@inertiajs/core'
import { IconCalendar, IconEye, IconReport } from '@tabler/icons-react'

const Index = (props) => {
  console.log(props)
  const [period, setPeriod] = useState(null)
  const evaluationList = period === null ? props.evaluations : props.evaluations.filter((evaluation) => evaluation.period === Number(period))
  
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = [{ title: '#' }, { title: 'Foto' }, { title: 'Nama Lengkap', key: 'full_name' }, {
    title: 'Sistem Pertandingan',
    key: 'role',
  }, { title: 'Total Penilaian', key: 'total_evaluations' }, { title: 'Aksi' }]
  // const [time, setTime] = useState(null)
  // const [reportSearch, setReportSearch] = useState('')
  
  // console.log(props)
  // const evaluationList = props.exerciseEvaluations?.filter((evaluation) => {
  //   if (time === null) {
  //     return true
  //   }
  //   return new Date(evaluation.exercise.date).toLocaleDateString('id').split('/').join('-').includes(time)
  // })
  // const tournamentList = props.tournaments?.filter((tournament) => {
  //   if (time === null) {
  //     return true
  //   }
  //   return new Date(tournament.date).toLocaleDateString('id').split('/').join('-').includes(time)
  // })
  
  const totalPoints = (evaluationId) => evaluationList.find((evaluation) => evaluation.id === evaluationId)?.tournaments.reduce((total, tournament) => {
    if (tournament.medal === 'Emas') {
      return total + 3
    } else if (tournament.medal === 'Perak') {
      return total + 2
    } else if (tournament.medal === 'Perunggu') {
      return total + 1
    }
    return total
  }, 0)
  
  
  const actionList = [
    {
      label: 'Rincian Laporan',
      icon: <IconEye />,
      onClick: (athlete) => router.get(route('reports.show', athlete.id)),
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
  const athleteList = props.athletes
    ?.filter(athlete => athlete.full_name.replace(/\s/g, '').toLowerCase().match(new RegExp(athleteSearch.replace(/\s/g, '').toLowerCase(), 'i')))
  const [sortedData, setSortedData] = useState(athleteList.map(athlete => ({
    ...athlete,
    total_evaluations: athlete.total_evaluations.toString(),
  })))
  const TDList = sortedData?.map((athlete, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar src={athlete.avatar} alt={athlete.full_name} />
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.role}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.total_evaluations}</MantineTable.Td>
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
                          onClick={() => action.onClick(athlete)}
                          disabled={props.auth.user.id === athlete.id || action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  const handleSort = (sortedData) => {
    setSortedData(sortedData)
  }
  
  return (
    <AppLayout title="Laporan" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Laporan' }]} />
          
          {['Ne-Waza', 'Fighting'].includes(props.auth.user.role) && (
            <Group>
              <Select
                display={{ base: 'none', xs: 'block' }} w={240}
                leftSection={<IconCalendar />}
                placeholder="Pilih periode..."
                variant="filled"
                clearable
                searchable
                nothingFoundMessage="Tidak ada periode ditemukan"
                checkIconPosition="right"
                onChange={(value) => {
                  if (value === null) {
                    setPeriod(null)
                  } else {
                    setPeriod(value)
                  }
                }}
                data={props.evaluations.map((evaluation) => ({
                  label: `${evaluation.period}`,
                  value: `${evaluation.period}`,
                }))}
                allowDeselect
                styles={{
                  label: { marginBottom: 8 },
                  input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                  section: { marginLeft: 0, width: 48, height: 48 },
                  error: { marginTop: 8 },
                }}
              />
              
              {props.auth.user.role.includes('Pelatih') && (
                <>
                  <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Cetak">
                    <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                                onClick={() => window.print()}>
                      <IconPrinter />
                    </ActionIcon>
                  </Tooltip>
                  
                  <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPrinter />} variant="filled" color="gold.2" h={48} radius={32}
                          px={16}
                          styles={{ section: { marginRight: 12 } }} onClick={() => window.print()}>
                    Cetak
                  </Button>
                </>
              )}
            </Group>
          )}
        </Group>
        
        {['Ne-Waza', 'Fighting'].includes(props.auth.user.role) && (
          <Select
            w="100%"
            clearable
            searchable
            allowDeselect
            nothingFoundMessage="Tidak ada periode ditemukan"
            display={{ base: 'block', xs: 'none' }}
            leftSection={<IconCalendar />}
            placeholder="Pilih periode..."
            variant="filled"
            checkIconPosition="right"
            onChange={(value) => {
              if (value === null) {
                setPeriod(null)
              } else {
                setPeriod(value)
              }
            }}
            data={props.evaluations.map((evaluation) => ({
              label: `${evaluation.period}`,
              value: `${evaluation.period}`,
            }))}
            styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }}
          />
        )}
      </Stack>
      
      {!['Ne-Waza', 'Fighting'].includes(props.auth.user.role) ? (
          <Table thList={THList} tdList={TDList} icon={<IconReport size={48} />} title="Laporan" data={sortedData} authed={props.auth.user}
                 handleSort={handleSort} />) :
        (
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
            
            {evaluationList.map((evaluation) => (
              <Stack gap={32} key={evaluation.id}>
                <Divider
                  label={`Periode ${evaluation.period} (${new Date(evaluation.start_date).toLocaleDateString('id').split('/').join('-')} - ${new Date(evaluation.end_date).toLocaleDateString('id').split('/').join('-')})`}
                  labelPosition="center" styles={{ label: { fontSize: 14 } }} />
                
                {evaluation.exercises.length && (
                  <Box>
                    <Title fz={26} mb={8}>Daftar Latihan</Title>
                    
                    <List type="ordered">
                      {evaluation.exercises.map(exercise => (
                        <List.Item key={exercise.id}>{exercise.name} di {exercise.place} pada
                          {new Date(exercise.date).toLocaleDateString('id').split('/').join('-')}</List.Item>
                      ))}
                    </List>
                  </Box>
                )}
                
                {evaluation.tournaments.length && (
                  <Box>
                    <Title fz={26} mb={8}>Daftar Pertandingan</Title>
                    
                    <Grid gutter={0}>
                      <Grid.Col span={9}>
                        <Group style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Nama Pertandingan</Group>
                      </Grid.Col>
                      
                      <Grid.Col span={3}>
                        <Center style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Medali (Poin)</Center>
                      </Grid.Col>
                      
                      <Grid.Col span={9}>
                        <Group style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}></Group>
                      </Grid.Col>
                      
                      <Grid.Col span={1}>
                        <Center style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Emas (3)</Center>
                      </Grid.Col>
                      
                      <Grid.Col span={1}>
                        <Center style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Perak (2)</Center>
                      </Grid.Col>
                      
                      <Grid.Col span={1}>
                        <Center style={{
                          border: '1px solid #e1e1e1',
                        }} px={16} h={48} fw={600}>Perunggu (1)</Center>
                      </Grid.Col>
                      
                      
                      {evaluation.tournaments.map((tournament) => (
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
                        }} px={16} h={48}>{totalPoints(evaluation.id)}</Center>
                      </Grid.Col>
                    </Grid>
                  </Box>
                )}
                
                <Box>
                  <Title fz={26} mb={8}>Daftar Penilaian</Title>
                  
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
                    
                    <Grid.Col span={12}>
                      <Group style={{
                        overflow: 'auto',
                        border: '1px solid #e1e1e1',
                      }} px={16} py={11}>
                        <Text fw={600}>Catatan : </Text>
                        
                        <TypographyStylesProvider>
                          <div
                            dangerouslySetInnerHTML={{ __html: evaluation.note }}
                          />
                        </TypographyStylesProvider>
                      </Group>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            ))}
          </Stack>
        )}
    
    </AppLayout>
  )
}

export default Index
