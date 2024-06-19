import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Box, Button, Center, Divider, Grid, Group, SimpleGrid, Stack, Text, Title, Tooltip } from '@mantine/core'
import { IconCalendar, IconPrinter } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useState } from 'react'
import { MonthPickerInput } from '@mantine/dates'

const Index = (props) => {
  const [time, setTime] = useState(null)
  const [isPrint, setIsPrint] = useState(false)
  
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
  
  const totalPoints = tournamentList.reduce((total, tournament) => {
    if (tournament.medal === 'Emas') {
      return total + 3
    } else if (tournament.medal === 'Perak') {
      return total + 2
    } else if (tournament.medal === 'Perunggu') {
      return total + 1
    }
    return total
  }, 0)
  
  window.onbeforeprint = function() {
    console.log('Print dialog opened!')
  }
  
  window.onafterprint = function() {
    console.log('Print dialog closed!')
  }
  
  return (
    <AppLayout title={`Laporan "${props.athlete.full_name}"`} authed={props.auth.user} meta={props.meta} isPrint={isPrint}>
      
      {!isPrint ? (<Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Laporan', route: 'reports.index' }, { label: 'Rincian' }]} />
          
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
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Cetak">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => window.print()}>
                    <IconPrinter />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPrinter />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => {
                  setIsPrint(true)
                  
                  setTimeout(() => {
                    window.print()
                    setIsPrint(false)
                  }, 1000)
                }}>
                  Cetak
                </Button>
              </>
            )}
          </Group>
        </Group>
        
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
      </Stack>) : <Title size={34} align="center" mb={32}>Laporan</Title>}
      
      <Stack gap={80}>
        <Grid align="center" grow>
          <Grid.Col span={{
            base: 12,
            sm: 4,
          }} mb={{
            base: 32,
            sm: 0,
          }}>
            <Avatar
              mx={{
                base: 'auto',
                sm: 0,
              }}
              src={props.athlete.avatar}
              alt={props.athlete.full_name}
              size={160} />
          </Grid.Col>
          
          <Grid.Col span={8}>
            <SimpleGrid cols={2}>
              <Box>
                <Text>Nama Lengkap :</Text>
                <Text fw={600}>{props.athlete.full_name}</Text>
              </Box>
              
              <Box>
                <Text>Jenis Kelamin :</Text>
                <Text fw={600}>{props.athlete.gender}</Text>
              </Box>
              
              <Box>
                <Text>Tanggal Lahir :</Text>
                <Text fw={600}>{new Date(props.athlete.birth_date).toLocaleDateString('id').split('/').join('-')}</Text>
              </Box>
              
              <Box>
                <Text>Alamat Surel :</Text>
                <Text fw={600}>{props.athlete.email}</Text>
              </Box>
              
              <Box>
                <Text>Sistem Pertandingan :</Text>
                <Text fw={600}>{props.athlete.role}</Text>
              </Box>
              
              <Box>
                <Text>Berat Badan :</Text>
                <Text fw={600}>{props.athlete.weight} kg</Text>
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
                    <Grid.Col span={10}>
                      <Group style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48} fw={600}>Kriteria</Group>
                    </Grid.Col>
                    
                    <Grid.Col span={2}>
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
                                  <Grid.Col span={10} key={subSubCriteriaId}>
                                    <Group style={{
                                      border: '1px solid #e1e1e1',
                                    }} px={16} h={48}>{subSubCriteriaId + 1}. {sub_sub_criteria.name}</Group>
                                  </Grid.Col>
                                  
                                  <Grid.Col span={2}>
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
                            <Grid.Col span={10}>
                              <Group style={{
                                border: '1px solid #e1e1e1',
                              }} px={16} h={48}>Rata-rata</Group>
                            </Grid.Col>
                            
                            <Grid.Col span={2}>
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
              <Grid.Col span={6}>
                <Group style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}>Nama Pertandingan</Group>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Center style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}>Medali (Poin)</Center>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Group style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}></Group>
              </Grid.Col>
              
              <Grid.Col span={2}>
                <Center style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}>Emas (3)</Center>
              </Grid.Col>
              
              <Grid.Col span={2}>
                <Center style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}>Perak (2)</Center>
              </Grid.Col>
              
              <Grid.Col span={2}>
                <Center style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48} fw={600}>Perunggu (1)</Center>
              </Grid.Col>
              
              
              {tournamentList.map((tournament, tournamentId) => (
                <>
                  <Grid.Col span={6}>
                    <Group style={{
                      border: '1px solid #e1e1e1',
                    }} px={16} h={48}>{tournament.name}</Group>
                  </Grid.Col>
                  
                  <Grid.Col span={2}>
                    <Center style={{
                      border: '1px solid #e1e1e1',
                    }} px={16} h={48}>{tournament.medal === 'Emas' ? 1 : '-'}</Center>
                  </Grid.Col>
                  
                  <Grid.Col span={2}>
                    <Center style={{
                      border: '1px solid #e1e1e1',
                    }} px={16} h={48}>{tournament.medal === 'Perak' ? 1 : '-'}</Center>
                  </Grid.Col>
                  
                  <Grid.Col span={2}>
                    <Center style={{
                      border: '1px solid #e1e1e1',
                    }} px={16} h={48}>{tournament.medal === 'Perunggu' ? 1 : '-'}</Center>
                  </Grid.Col>
                </>
              ))}
              
              <Grid.Col span={6}>
                <Group style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48}>Total</Group>
              </Grid.Col>
              
              <Grid.Col span={6}>
                <Center style={{
                  border: '1px solid #e1e1e1',
                }} px={16} h={48}>{totalPoints}</Center>
              </Grid.Col>
            </Grid>
          </Box>
        )}
      </Stack>
    
    </AppLayout>
  )
}

export default Index
