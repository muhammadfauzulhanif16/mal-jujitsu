import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Accordion, Avatar, Center, Divider, Fieldset, Grid, Group, Indicator, List, NumberInput, Radio, Select, Stack, Text, TextInput } from '@mantine/core'
import { IconCalendar, IconClipboardText, IconMedal, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import 'dayjs/locale/id'
import { Link, RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { MonthPickerInput } from '@mantine/dates'

const Show = (props) => {
  const [months, setMonths] = useState([new Date(props.evaluation.start_date), new Date(props.evaluation.end_date)])
  const [role, setRole] = useState('')
  const form = useForm({
    time_period: months,
    athlete_id: props.evaluation.athlete_id,
    exercises: [],
    tournaments: [],
    note: props.evaluation.note,
    evaluations: props.evaluation.evaluation_criterias.map((evaluation) => ({
      sub_sub_criteria_id: evaluation.sub_sub_criteria_id,
      value: evaluation.value,
    })),
  })
  console.log(form.data)
  useEffect(() => {
    form.setData('time_period', months.map((month) => new Date(month).toLocaleString()))
  }, [months])
  
  useEffect(() => {
    const month_periods = months.map((month) => {
      let date = new Date(month)
      let monthNumber = date.getMonth() + 1 // getMonth() mengembalikan bulan dari 0-11, jadi tambahkan 1
      let year = date.getFullYear()
      return `${monthNumber}-${year}`
    })
    const dateRange = []
    
    if (form.data.time_period && form.data.time_period.length >= 2) {
      const startMonthYear = month_periods[0] // Rentang waktu awal
      const endMonthYear = month_periods[1]
      
      const [startMonth, startYear] = startMonthYear?.split('-')
      const [endMonth, endYear] = endMonthYear?.split('-')
      
      // Parse bulan dan tahun menjadi integer
      const startM = parseInt(startMonth, 10)
      const endM = parseInt(endMonth, 10)
      const startY = parseInt(startYear, 10)
      const endY = parseInt(endYear, 10)
      
      // Loop untuk setiap tahun-bulan dalam rentang
      for (let y = startY; y <= endY; y++) {
        const currentStartMonth = (y === startY) ? startM : 1
        const currentEndMonth = (y === endY) ? endM : 12
        
        for (let m = currentStartMonth; m <= currentEndMonth; m++) {
          dateRange.push(`${m}-${y}`) // Format bulan-tahun dan tambahkan ke array
        }
      }
    }
    
    const filteredExercises = props.exercises
      .filter((exercise) =>
        exercise.athletes.some((athlete) => athlete.id === form.data.athlete_id),
      )
      .filter((exercise) => {
        const exerciseDate = new Date(exercise.date)
        const exerciseMonth = exerciseDate.getMonth()
        const exerciseYear = exerciseDate.getFullYear()
        
        const formattedExerciseDate = `${exerciseMonth + 1}-${exerciseYear}`
        
        return dateRange.includes(formattedExerciseDate)
      })
      .map((exercise) => ({
        ...exercise,
        date: new Date(exercise.date).toLocaleDateString('id').split('/').join('-'),
      }))
    
    const filteredTournaments = props.tournaments
      .filter((tournament) =>
        tournament.athlete_id === form.data.athlete_id,
      )
      .filter((tournament) => {
        const tournamentDate = new Date(tournament.date)
        const tournamentMonth = tournamentDate.getMonth()
        const tournamentYear = tournamentDate.getFullYear()
        
        const formattedTournamentDate = `${tournamentMonth + 1}-${tournamentYear}`
        
        return dateRange.includes(formattedTournamentDate)
      })
      .map((tournament) => ({
        ...tournament,
        date: new Date(tournament.date).toLocaleDateString('id').split('/').join('-'),
      }))
    
    form.setData((prevData) => ({
      ...prevData,
      exercises: filteredExercises,
      tournaments: filteredTournaments,
    }))
  }, [props.exercises, props.tournaments, form.data.athlete_id, months])
  
  
  const criterias = props.criterias.map((criteria) => {
    return {
      ...criteria,
      sub_criterias: criteria.sub_criterias
        .filter(sub_criteria => criteria.name !== 'Teknik Bertanding' || sub_criteria.name === role)
        .map((sub_criteria) => {
          return {
            ...sub_criteria,
            sub_sub_criterias: sub_criteria.sub_sub_criterias,
          }
        }),
    }
  })
  
  useEffect(() => {
    if (role) {
      form.setData('evaluations', criterias.flatMap(criteria =>
        criteria.sub_criterias.flatMap(sub_criteria =>
          sub_criteria.sub_sub_criterias.map(sub_sub_criteria => ({
            sub_sub_criteria_id: sub_sub_criteria.id,
            value: '-',
          })),
        ),
      ))
    }
  }, [role])
  
  const editor = useEditor({
    extensions: [StarterKit, Link, Placeholder.configure({ placeholder: 'Masukkan catatan' })],
    content: form.data.note,
    onUpdate({ editor }) {
      form.setData('note', editor.getHTML())
    },
    editable: false,
  })
  
  const items = [
    {
      icon: <IconClipboardText />,
      value: 'Latihan',
      evaluations: form.data.exercises,
      total: form.data.exercises.length,
    },
    {
      icon: <IconMedal />,
      value: 'Pertandingan',
      evaluations: form.data.tournaments,
      total: form.data.tournaments.length,
    },
  ]
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('evaluations.store'))
    }}>
      <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
        <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, { label: 'Rincian' }]} />
        
        <Divider my={32} />
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Center>
              <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.2"
                         label={form.data.athlete_id ? props.athletes.find((athlete) => athlete.id === form.data.athlete_id)?.role : 'Atlet'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.athletes.find((athlete) => athlete.id === form.data.athlete_id)?.avatar}
                  alt={props.athletes.find((athlete) => athlete.id === form.data.athlete_id)?.name}
                  size={160}
                />
              </Indicator>
            </Center>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap={48}>
              <Fieldset radius={20} legend="Informasi Penilaian"
                        styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                <Select
                  mb={16}
                  withAsterisk
                  variant="filled"
                  styles={{
                    label: { marginBottom: 8 },
                    input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                    section: { marginLeft: 0, width: 48, height: 48 },
                    error: { marginTop: 8 },
                  }}
                  leftSection={<IconUser />}
                  label="Atlet"
                  clearable
                  searchable
                  disabled
                  value={form.data.athlete_id}
                  nothingFoundMessage="Tidak ada atlet ditemukan"
                  placeholder="Pilih atlet..."
                  checkIconPosition="right"
                  onChange={(value) => {
                    form.setData('athlete_id', value)
                    setRole(
                      props.athletes.find((athlete) => athlete.id === value)?.role,
                    )
                    
                    if (!value) {
                      form.setError({ athlete_id: 'Atlet tidak boleh kosong.' })
                    } else {
                      form.clearErrors('athlete_id')
                    }
                  }}
                  data={
                    props.athletes.map((athlete) => ({
                      value: athlete.id,
                      label: `${athlete.full_name} (${athlete.role})`,
                    }))
                  }
                  error={form.errors.athlete_id}
                />
                
                <MonthPickerInput
                  valueFormat="M-YYYY"
                  locale="id"
                  disabled
                  mb={16}
                  value={months}
                  type="range"
                  withAsterisk
                  variant="filled"
                  styles={{
                    label: { marginBottom: 8 },
                    input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                    section: { marginLeft: 0, width: 48, height: 48 },
                    error: { marginTop: 8 },
                  }}
                  leftSection={<IconCalendar />}
                  label="Jangka Waktu Periode"
                  clearable
                  placeholder="Pilih jangka waktu periode..."
                  onChange={(value) => {
                    setMonths(value)
                    
                    if (!value) {
                      form.setError({ time_period: 'Jangka waktu periode tidak boleh kosong.' })
                    } else {
                      form.clearErrors('time_period')
                    }
                  }}
                  // data={props.exercises.map((exercise) => ({
                  //   value: exercise.id,
                  //   label: `${exercise.name} (${new Date(exercise.date).toLocaleDateString('id').split('/').join('-')})`,
                  // }))}
                  error={form.errors.time_period}
                />
                
                {form.data.athlete_id && (<>
                  <Text mb={8} fz={14}>
                    Daftar latihan dan pertandingan
                  </Text>
                  <Accordion variant="contained">
                    {items.map((item) => (
                      <Accordion.Item key={item.value} value={item.value}>
                        <Accordion.Control icon={item.icon}>{item.value} ({item.total})</Accordion.Control>
                        <Accordion.Panel>
                          {item.evaluations.length > 0 ? (
                            <List type="ordered">
                              {item.evaluations.map((evaluation) => (
                                <List.Item
                                  key={evaluation.id}>{evaluation.name} di {evaluation.place} pada {evaluation.date}</List.Item>
                              ))}
                            </List>
                          ) : 'Tidak ada data.'}
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </>)}
              </Fieldset>
              
              {form.data.athlete_id && (
                <Stack gap={48}>
                  {criterias.map((criteria) => (
                    <Stack key={criteria.id} gap={0}>
                      <Divider label={criteria?.name.toUpperCase()} styles={{ label: { fontSize: '14px' } }} labelPosition="center" />
                      
                      {criteria.type === 'radio' && (
                        <>
                          <Text>Skala Penilaian : </Text>
                          
                          <List>
                            <List.Item>1 = Sangat buruk</List.Item>
                            <List.Item>2 = Buruk</List.Item>
                            <List.Item>3 = Cukup</List.Item>
                            <List.Item>4 = Baik</List.Item>
                            <List.Item>5 = Sangat baik</List.Item>
                          </List>
                        </>
                      )}
                      
                      {criteria.sub_criterias.map((sub_criteria) => (
                        <Fieldset key={sub_criteria.id} radius={20} legend={sub_criteria.name}
                                  styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                          <Stack>
                            {sub_criteria.sub_sub_criterias.map((sub_sub_criteria, sub_sub_criteria_id) => sub_sub_criteria.type === 'radio' ? (
                                <Radio.Group value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                             key={sub_sub_criteria.id} description={sub_sub_criteria.description}
                                             label={sub_sub_criteria.name}
                                             withAsterisk={Boolean(sub_sub_criteria.required)}
                                             styles={{
                                               label: { marginBottom: 8 }, description: { marginBottom: 8 }, error: { marginTop: 8 },
                                             }} onChange={(value) => {
                                  form.data.evaluations.forEach((evaluation) => {
                                    if (evaluation.sub_sub_criteria_id === sub_sub_criteria.id) {
                                      evaluation.value = value
                                    }
                                  })
                                  
                                  form.setData('evaluations', form.data.evaluations)
                                  
                                  // if (!value) {
                                  //   form.setError({ role: 'Peran tidak boleh kosong.' })
                                  // } else {
                                  //   form.clearErrors('role')
                                  // }
                                }}>
                                  <Group gap={32}>
                                    <Radio disabled styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('1') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="1" label="1" color="gold.2" />
                                    <Radio disabled styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('2') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="2" label="2" color="gold.2" />
                                    <Radio disabled styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('3') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="3" label="3" color="gold.2" />
                                    <Radio disabled styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('4') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="4" label="4" color="gold.2" />
                                    <Radio disabled styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('5') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="5" label="5" color="gold.2" />
                                  </Group>
                                </Radio.Group>
                              ) : sub_sub_criteria.type === 'number' ? (
                                <NumberInput value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                             disabled hideControls description={sub_sub_criteria.description}
                                             key={sub_sub_criteria.id}
                                             label={sub_sub_criteria.name}
                                             withAsterisk={Boolean(sub_sub_criteria.required)} variant="filled"
                                             styles={{
                                               label: { marginBottom: 8 },
                                               description: { marginBottom: 8 },
                                               input: { height: 48, borderRadius: 32, paddingLeft: 16, paddingRight: 16 },
                                               section: { marginLeft: 0, width: 48, height: 48 },
                                               error: { marginTop: 8 },
                                             }} placeholder="Masukkan nilai..." onChange={(value) => {
                                  form.data.evaluations.forEach((evaluation) => {
                                    if (evaluation.sub_sub_criteria_id === sub_sub_criteria.id) {
                                      evaluation.value = value
                                    }
                                  })
                                  
                                  form.setData('evaluations', form.data.evaluations)
                                  
                                  // if (!email) {
                                  //   form.setError({ email: 'Alamat surel tidak boleh kosong.' })
                                  // } else if (!/\S+@\S+\.\S+/.test(email)) {
                                  //   form.setError({ email: 'Alamat surel tidak sah.' })
                                  // } else {
                                  //   form.clearErrors('email')
                                  // }
                                }} error={form.errors.email} />
                              ) : (
                                <TextInput value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                           disabled key={sub_sub_criteria.id} description={sub_sub_criteria.description}
                                           label={sub_sub_criteria.name}
                                           withAsterisk={Boolean(sub_sub_criteria.required)}
                                           variant="filled" styles={{
                                  description: { marginBottom: 8 },
                                  label: { marginBottom: 8 },
                                  input: { height: 48, borderRadius: 32, paddingLeft: 16, paddingRight: 16 },
                                  section: { marginLeft: 0, width: 48, height: 48 },
                                  error: { marginTop: 8 },
                                }} placeholder="Masukkan nilai..." onChange={(e) => {
                                  form.data.evaluations.forEach((evaluation) => {
                                    if (evaluation.sub_sub_criteria_id === sub_sub_criteria.id) {
                                      evaluation.value = e.target.value
                                    }
                                  })
                                  
                                  form.setData('evaluations', form.data.evaluations)
                                  
                                  // if (!e.target.value) {
                                  //   form.setError(`evaluations.${sub_sub_criteria_id}.value`, 'Nilai tidak boleh kosong.')
                                  // } else {
                                  //   form.clearErrors('value')
                                  // }
                                }} error={form.errors.value} />
                              ),
                            )}
                          </Stack>
                        </Fieldset>
                      ))}
                    </Stack>
                  ))}
                  
                  <Fieldset radius={20} legend="Informasi Tambahan"
                            styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                    <Text fz={14} mb={8}>Catatan</Text>
                    <RichTextEditor editor={editor} style={{
                      borderRadius: 20,
                      fontSize: 14,
                    }}>
                      <RichTextEditor.Content />
                    </RichTextEditor>
                  </Fieldset>
                </Stack>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Show
