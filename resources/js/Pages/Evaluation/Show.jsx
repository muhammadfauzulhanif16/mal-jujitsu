import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Center, Divider, Fieldset, Grid, Group, Indicator, NumberInput, Radio, Select, Stack, Text, TextInput } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { Link, RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { useEffect, useState } from 'react'

const Show = (props) => {
  console.log(props)
  const [role, setRole] = useState(props.exercise_evaluation.athlete.role)
  const form = useForm({
    exercise_id: props.exercise_evaluation.exercise.id,
    athlete_id: props.exercise_evaluation.athlete.id,
    note: props.exercise_evaluation.note,
    evaluations: props.exercise_evaluation.evaluations.map((evaluation) => ({
      sub_sub_criteria_id: evaluation.sub_sub_criteria_id,
      value: evaluation.value,
    })),
  })
  
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
          sub_criteria.sub_sub_criterias.map(sub_sub_criteria => {
            const existingEvaluation = form.data.evaluations.find(evaluation => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)
            
            return {
              sub_sub_criteria_id: sub_sub_criteria.id,
              value: existingEvaluation ? existingEvaluation.value : '',
            }
          }),
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
  
  const athletes = [
    ...(props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athletes || []),
    ...(props.exercise_evaluation.athlete ? [props.exercise_evaluation.athlete] : []),
  ]
  
  const selectedAthlete = athletes.find((athlete) => athlete.id === form.data.athlete_id)
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.put(route('evaluations.update', props.exercise_evaluation.id))
    }}>
      <AppLayout
        title={`Penilaian Latihan ${form.data.exercise_id ? `'${[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.name}'` : ''}`}
        authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
        <Group w="100%" justify="space-between" mb={32}>
          <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, { label: 'Rincian' }]} />
        </Group>
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Center>
              <Indicator
                styles={{ indicator: { padding: 16, border: '4px solid white' } }}
                inline color="gold.2"
                label={selectedAthlete ? selectedAthlete.role : 'Atlet'}
                position="bottom-center" size={32} withBorder
              >
                <Avatar
                  mx="auto"
                  src={selectedAthlete ? selectedAthlete.avatar : null}
                  alt={selectedAthlete ? selectedAthlete.full_name : null}
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
                  disabled
                  variant="filled"
                  styles={{
                    label: { marginBottom: 8 },
                    input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                    section: { marginLeft: 0, width: 48, height: 48 },
                    error: { marginTop: 8 },
                  }}
                  leftSection={<IconUser />}
                  label="Latihan"
                  clearable
                  searchable
                  value={form.data.exercise_id}
                  nothingFoundMessage="Tidak ada latihan ditemukan"
                  placeholder="Pilih latihan..."
                  checkIconPosition="right"
                  onChange={(value) => {
                    form.setData('exercise_id', value)
                    
                    if (!value) {
                      form.setError({ exercise_id: 'Latihan tidak boleh kosong.' })
                    } else {
                      form.clearErrors('exercise_id')
                    }
                  }}
                  data={props.exercises.map((exercise) => ({
                    value: exercise.id,
                    label: `${exercise.name} (${new Date(exercise.date).toLocaleDateString('id').split('/').join('-')})`,
                  }))}
                  error={form.errors.exercise_id}
                />
                
                <Select
                  value={form.data.athlete_id}
                  disabled
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
                  nothingFoundMessage="Tidak ada atlet ditemukan"
                  placeholder="Pilih atlet..."
                  checkIconPosition="right"
                  onChange={(value) => {
                    form.setData('athlete_id', value)
                    setRole(props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athletes.find((athlete) => athlete.id === value)?.role)
                    
                    if (!value) {
                      form.setError({ athlete_id: 'Atlet tidak boleh kosong.' })
                    } else {
                      form.clearErrors('athlete_id')
                    }
                  }}
                  data={
                    [
                      ...(props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athletes || []),
                      props.exercise_evaluation.athlete ? props.exercise_evaluation.athlete : [],
                    ].map((athlete) => ({
                      value: athlete.id,
                      label: `${athlete.full_name} (${athlete.role})`,
                    }))
                  }
                  error={form.errors.athlete_id}
                />
              </Fieldset>
              
              {form.data.exercise_id && (
                <Stack gap={48}>
                  {criterias.map((criteria) => (
                    <Stack key={criteria.id} gap={0}>
                      <Divider label={criteria?.name.toUpperCase()} styles={{ label: { fontSize: '14px' } }} labelPosition="center" />
                      
                      {criteria.sub_criterias.map((sub_criteria) => (
                        <Fieldset key={sub_criteria.id} radius={20} legend={sub_criteria.name}
                                  styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                          <Stack>
                            {sub_criteria.sub_sub_criterias.map((sub_sub_criteria, sub_sub_criteria_id) => sub_sub_criteria.type === 'radio' ? (
                                <Radio.Group value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                             key={sub_sub_criteria.id} description={sub_sub_criteria.description} label={sub_sub_criteria.name}
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
                                    <Radio styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('1') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="1" label="1" color="gold.2" />
                                    <Radio styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('2') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="2" label="2" color="gold.2" />
                                    <Radio styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('3') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="3" label="3" color="gold.2" />
                                    <Radio styles={{
                                      label: { marginLeft: 16, padding: 0, fontSize: 14 },
                                      radio: {
                                        border: 0,
                                        backgroundColor: form.data.evaluations.map((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id && evaluation.value).includes('4') ? 'var(--mantine-color-gold-2)' : '#f1f3f5',
                                      },
                                    }} size="md" value="4" label="4" color="gold.2" />
                                    <Radio styles={{
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
                                             hideControls description={sub_sub_criteria.description} key={sub_sub_criteria.id} label={sub_sub_criteria.name}
                                             disabled variant="filled"
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
                                           key={sub_sub_criteria.id} description={sub_sub_criteria.description} label={sub_sub_criteria.name}
                                           disabled
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
