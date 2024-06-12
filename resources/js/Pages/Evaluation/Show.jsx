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

const Edit = (props) => {
  const form = useForm({
    exercise_id: props.exercise_evaluation.exercise.id,
    note: props.exercise_evaluation.note,
    evaluations: props.evaluations.map((evaluation) => ({
      sub_sub_criteria_id: evaluation.sub_sub_criteria_id,
      value: evaluation.value,
    })),
  })
  
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
            <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.1"
                       label={form.data.exercise_id ? [...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.role : 'Atlet'}
                       position="bottom-center" size={32} withBorder>
              <Avatar
                mx="auto"
                src={[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.avatar}
                alt={[...props.exercises, props.exercise_evaluation.exercise].find((exercise) => exercise.id === form.data.exercise_id)?.athlete.full_name}
                size={160}
              />
            </Indicator>
          </Center>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 8 }}>
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
                label: `${exercise.name} ~ ${exercise.date} (${exercise.athlete.full_name} ~ ${exercise.athlete.role})`,
              }))}
            />
          </Fieldset>
          
          <Box>
            {props.criterias.map((criteria) => (
              <Box key={criteria.id}>
                <Divider mt={48} label={criteria.name.toUpperCase()} styles={{ label: { fontSize: '14px' } }} labelPosition="center" />
                
                {criteria.sub_criterias.map((sub_criteria) => (
                  <Fieldset key={sub_criteria.id} radius={20} legend={sub_criteria.name}
                            styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                    <Stack>
                      {sub_criteria.sub_sub_criterias.map((sub_sub_criteria) => sub_sub_criteria.type === 'radio' ? (
                          <Radio.Group key={sub_sub_criteria.id} description={sub_sub_criteria.description} label={sub_sub_criteria.name} styles={{
                            label: { marginBottom: 8 }, description: { marginBottom: 8 }, error: { marginTop: 8 },
                          }} value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value}>
                            <Group gap={32}>
                              <Radio disabled size="md" value="1" label="1" color="gold.1" />
                              <Radio disabled size="md" value="2" label="2" color="gold.1" />
                              <Radio disabled size="md" value="3" label="3" color="gold.1" />
                              <Radio disabled size="md" value="4" label="4" color="gold.1" />
                              <Radio disabled size="md" value="5" label="5" color="gold.1" />
                            </Group>
                          </Radio.Group>
                        ) : sub_sub_criteria.type === 'number' ? (
                          <NumberInput disabled hideControls description={sub_sub_criteria.description} key={sub_sub_criteria.id} label={sub_sub_criteria.name}
                                       variant="filled" styles={{
                            label: { marginBottom: 8 },
                            description: { marginBottom: 8 },
                            input: { height: 48, borderRadius: 32, paddingLeft: 16, paddingRight: 16 },
                            section: { marginLeft: 0, width: 48, height: 48 },
                            error: { marginTop: 8 },
                          }} value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value
                          } />
                        ) : (
                          <TextInput key={sub_sub_criteria.id} disabled description={sub_sub_criteria.description} label={sub_sub_criteria.name}
                                     variant="filled" styles={{
                            description: { marginBottom: 8 },
                            label: { marginBottom: 8 },
                            input: { height: 48, borderRadius: 32, paddingLeft: 16, paddingRight: 16 },
                            section: { marginLeft: 0, width: 48, height: 48 },
                            error: { marginTop: 8 },
                          }} value={form.data.evaluations.find((evaluation) => evaluation.sub_sub_criteria_id === sub_sub_criteria.id)?.value} />
                        ),
                      )}
                    </Stack>
                  </Fieldset>
                ))}
              </Box>
            ))}
          </Box>
          
          <Fieldset radius={20} legend="Informasi Tambahan"
                    styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
            <Text mb={8} fz={14}>Catatan</Text>
            <RichTextEditor editor={editor} style={{
              borderRadius: 20,
              cursor: 'not-allowed',
              color: '#868e96',
              fontSize: 14,
            }}>
              <RichTextEditor.Content />
            </RichTextEditor>
          </Fieldset>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}

export default Edit
