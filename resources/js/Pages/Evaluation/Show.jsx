import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Box, Center, Divider, Fieldset, Grid, Group, Indicator, NumberInput, Radio, Select, Stack, Text, TextInput } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { Link, RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useEffect, useState } from 'react'

const Edit = (props) => {
  const [role, setRole] = useState(props.exercise_evaluation.exercise.athlete.user.role)
  const form = useForm({
    exercise_id: props.exercise_evaluation.exercise.id,
    note: props.exercise_evaluation.note,
    evaluations: props.evaluations.map((evaluation) => ({
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
  
  return (
    <AppLayout
      title={`Penilaian Latihan ${form.data.exercise_id ? `'${[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.name}'` : ''}`}
      authed={props.auth.user} meta={props.meta}>
      <Box mb={32}>
        <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, { label: 'Rincian' }]} />
      </Box>
      
      <Grid grow justify="space-between">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Center>
            <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.2"
                       label={form.data.exercise_id ? [...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.user.role : 'Atlet'}
                       position="bottom-center" size={32} withBorder>
              <Avatar
                mx="auto"
                src={[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.user.avatar}
                alt={[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.user.full_name}
                size={160}
              />
            </Indicator>
          </Center>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap={48}>
            <Fieldset radius={20} legend="Informasi Latihan"
                      styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
              <Select
                variant="filled"
                styles={{
                  label: { marginBottom: 8 },
                  input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                  section: { marginLeft: 0, width: 48, height: 48 },
                  error: { marginTop: 8 },
                }}
                disabled
                leftSection={<IconUser />}
                label="Latihan"
                clearable
                searchable
                value={form.data.exercise_id}
                data={[...props.exercises, props.exercise_evaluation.exercise].map((exercise) => ({
                  value: exercise.id,
                  label: `${exercise.name} (${new Date(exercise.date).toLocaleDateString('id').split('/').join('-')}) | ${exercise.athlete.user.full_name} (${exercise.athlete.user.role})`,
                }))}
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
                                           key={sub_sub_criteria.id} description={sub_sub_criteria.description} label={sub_sub_criteria.name} withAsterisk
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
                                  <Radio size="md" disabled value="1" label="1" color="gold.2" />
                                  <Radio size="md" disabled value="2" label="2" color="gold.2" />
                                  <Radio size="md" disabled value="3" label="3" color="gold.2" />
                                  <Radio size="md" disabled value="4" label="4" color="gold.2" />
                                  <Radio size="md" disabled value="5" label="5" color="gold.2" />
                                </Group>
                              </Radio.Group>
                            ) : sub_sub_criteria.type === 'number' ? (
                              <NumberInput disabled
                                           value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                           hideControls description={sub_sub_criteria.description} key={sub_sub_criteria.id} label={sub_sub_criteria.name}
                                           withAsterisk variant="filled"
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
                              <TextInput disabled
                                         value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}
                                         key={sub_sub_criteria.id} description={sub_sub_criteria.description} label={sub_sub_criteria.name} withAsterisk
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
                    cursor: 'not-allowed',
                    color: '#868e96',
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
  )
}

export default Edit
