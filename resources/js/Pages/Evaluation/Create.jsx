import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Center, Divider, Fieldset, Grid, Group, Indicator, Select, Stack, Tooltip } from '@mantine/core'
import { IconCornerDownLeft, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'

const Create = (props) => {
  const form = useForm({
    exercise_id: '',
    evaluations: [{
      criteria_id: '',
      rating: '',
    }],
  })
  
  console.log(props)
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('evaluations.store'))
    }}>
      <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, { label: 'Tambah' }]} />
          
          <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Penilaian">
            <ActionIcon type="submit" ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', xs: 'none' }}
              // disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.medal}
            >
              <IconCornerDownLeft />
            </ActionIcon>
          </Tooltip>
          
          <Button display={{ base: 'none', xs: 'block' }} type="submit" w={240} leftSection={<IconCornerDownLeft />} variant="filled" color="gold.1" h={48}
                  px={16} styles={{ section: { marginRight: 12 } }} radius={32} loading={form.processing}
            // disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.medal}
          >
            Tambah Penilaian
          </Button>
        </Group>
        
        <Divider my={32} />
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Center>
              <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.1"
                         label={form.data.exercise_id ? props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athlete.role : 'Atlet'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athlete.avatar}
                  alt={props.exercises.find((exercise) => exercise.id === form.data.exercise_id)?.athlete.full_name}
                  size={160}
                />
              </Indicator>
            </Center>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Fieldset mb={16} radius={20} legend="Informasi Latihan"
                      styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
              <Select
                withAsterisk
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
                  label: `${exercise.name} (${exercise.athlete.full_name} - ${exercise.athlete.role})`,
                }))}
                error={form.errors.exercise_id}
              />
            </Fieldset>
            
            <Stack>
              {props.criterias.map((exercise) => (
                <Fieldset radius={20} legend={exercise.name}
                          styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
                  <Select
                    withAsterisk
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
                    data={props.exercises.map((exercise) => ({ value: exercise.id, label: `${exercise.name} (${exercise.athlete.full_name})` }))}
                    error={form.errors.exercise_id}
                  />
                </Fieldset>
              ))}
            
            </Stack>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Create
