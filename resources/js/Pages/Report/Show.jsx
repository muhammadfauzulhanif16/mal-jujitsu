import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
  TypographyStylesProvider,
} from '@mantine/core'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useState } from 'react'
import { IconCalendar, IconPrinter } from '@tabler/icons-react'

const Show = (props) => {
  console.log(props)
  const [isPrint, setIsPrint] = useState(false)
  const [period, setPeriod] = useState(null)
  const evaluationList = period === null ? props.evaluations : props.evaluations.filter((evaluation) => evaluation.period === Number(period))
  
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
  
  return (
    <AppLayout title="Laporan" isPrint={isPrint} authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      {!isPrint ? (<Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Laporan', route: 'reports.index' }, { label: 'Rincian' }]} />
          
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
      </Stack>) : <Title size={34} align="center" mb={32}>Laporan</Title>}
      
      <Stack gap={80}>
        <Grid align="center">
          <Grid.Col span={4}>
            <Avatar src={props.athlete.avatar}
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
        
        {evaluationList.map((evaluation) => (
          <Stack gap={32} key={evaluation.id}>
            <Divider
              label={`Periode ${evaluation.period} (${new Date(evaluation.start_date).toLocaleDateString('id').split('/').join('-')} - ${new Date(evaluation.end_date).toLocaleDateString('id').split('/').join('-')})`}
              labelPosition="center" styles={{ label: { fontSize: 14 } }} />
            
            {evaluation.exercises.length && (
              <Box>
                <Title fz={26} mb={8}>Daftar Latihan</Title>
                
                <Grid gutter={0}>
                  <Grid.Col span={12}>
                    <Group style={{
                      border: '1px solid #e1e1e1',
                    }} px={16} h={48} fw={600}>Nama Latihan, Tempat, Tanggal</Group>
                  </Grid.Col>
                  
                  {evaluation.exercises.map((exercise) => (
                    <Grid.Col span={12} key={exercise.id}>
                      <Group style={{
                        border: '1px solid #e1e1e1',
                      }} px={16} h={48}>
                        {`${exercise.name} di ${exercise.place} pada ${new Date(exercise.date).toLocaleDateString('id').split('/').join('-')}`}
                      </Group>
                    </Grid.Col>
                  ))}
                </Grid>
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
                <Grid.Col span={8}>
                  <Group style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Kriteria</Group>
                </Grid.Col>
                
                <Grid.Col span={2}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Nilai</Center>
                </Grid.Col>
                
                <Grid.Col span={2}>
                  <Center style={{
                    border: '1px solid #e1e1e1',
                  }} px={16} h={48} fw={600}>Patokan</Center>
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
                              <Grid.Col span={8} key={subSubCriteriaId}>
                                <Group style={{
                                  border: '1px solid #e1e1e1',
                                }} px={16} h={48}>{subSubCriteriaId + 1}. {sub_sub_criteria.name}</Group>
                              </Grid.Col>
                              
                              <Grid.Col span={2}>
                                <Group style={{
                                  border: '1px solid #e1e1e1',
                                }} px={16} h={48}>{sub_sub_criteria.evaluation.value} {sub_sub_criteria.evaluation.sub_sub_criteria.unit}</Group>
                              </Grid.Col>
                              
                              <Grid.Col span={2}>
                                <Group style={{
                                  border: '1px solid #e1e1e1',
                                }} px={16}
                                       h={48}>{props.athlete.gender === 'Laki-laki' ? sub_sub_criteria.evaluation.sub_sub_criteria.male_benchmark : sub_sub_criteria.evaluation.sub_sub_criteria.female_benchmark}</Group>
                              </Grid.Col>
                            </>
                          ))}
                        </>
                      )
                    })}
                    
                    {criteria.type === 'radio' && (
                      <>
                        <Grid.Col span={8}>
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
                              
                              const average = Number((sum / count).toFixed(2))
                              const descriptions = {
                                1: 'Sangat buruk',
                                2: 'Buruk',
                                3: 'Cukup',
                                4: 'Baik',
                                5: 'Sangat baik',
                              }
                              const description = descriptions[Math.round(average)] || 'Tidak diketahui'
                              
                              return `${average} (${description})`
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
    </AppLayout>
  )
}

export default Show
