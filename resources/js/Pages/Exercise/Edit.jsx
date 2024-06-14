import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Fieldset, Grid, Group, Indicator, Select, SimpleGrid, TextInput, Tooltip } from '@mantine/core'
import { IconBuilding, IconCalendar, IconClipboardText, IconClockPause, IconClockPlay, IconCornerDownLeft, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { DatePickerInput, TimeInput } from '@mantine/dates'

const Edit = (props) => {
  const form = useForm({
    name: props.exercise.name,
    place: props.exercise.place,
    athlete_id: props.exercise.athlete.id,
    coach_id: props.exercise.coach.id,
    date: props.exercise.date,
    start_time: props.exercise.start_time,
    end_time: props.exercise.end_time,
  })
  console.log(props)
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.put(route('exercises.update', props.exercise.id))
    }}>
      <AppLayout title="Latihan" authed={props.auth.user} meta={props.meta}>
        <Group w="100%" mb={32} justify="space-between">
          <Breadcrumbs navList={[{ label: 'Latihan', route: 'exercises.index' }, { label: 'Ubah' }]} />
          
          <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Latihan">
            <ActionIcon type="submit" ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', xs: 'none' }}
                        disabled={form.hasErrors || Object.values(form.data).some(field => !field)}>
              <IconCornerDownLeft />
            </ActionIcon>
          </Tooltip>
          
          <Button display={{ base: 'none', xs: 'block' }} type="submit" w={240} leftSection={<IconCornerDownLeft />} variant="filled" color="gold.2" h={48}
                  px={16} styles={{ section: { marginRight: 12 } }} radius={32} loading={form.processing}
                  disabled={form.hasErrors || Object.values(form.data).some(field => !field)}>
            Ubah Latihan
          </Button>
        </Group>
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <SimpleGrid spacing={32} cols={{
              base: 1,
              xs: 2,
              md: 1,
            }}>
              <Indicator inline color="gold.2" styles={{ indicator: { padding: 16 } }}
                         label={form.data.athlete_id ? props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.role : 'Atlet'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.avatar}
                  alt={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.full_name}
                  size={160}
                />
              </Indicator>
              
              <Indicator inline color="gold.2" styles={{ indicator: { padding: 16 } }}
                         label={form.data.coach_id ? props.coaches.find((coach) => coach.user.id === form.data.coach_id)?.user.role : 'Pelatih'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.coaches.find((coach) => coach.user.id === form.data.coach_id)?.user.avatar}
                  alt={props.coaches.find((coach) => coach.user.id === form.data.coach_id)?.user.full_name}
                  size={160}
                />
              </Indicator>
            </SimpleGrid>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Fieldset mb={16} radius={20} legend="Informasi Latihan"
                      styles={{
                        root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
                        legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
                      }}>
              <TextInput withAsterisk variant="filled" leftSection={<IconClipboardText />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Nama" placeholder="Masukkan nama..." onChange={(e) => {
                form.setData('name', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ name: 'Nama tidak boleh kosong.' })
                } else {
                  form.clearErrors('name')
                }
              }} error={form.errors.name} value={form.data.name} />
              
              <TextInput withAsterisk variant="filled" leftSection={<IconBuilding />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Tempat" placeholder="Masukkan tempat..." onChange={(e) => {
                form.setData('place', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ place: 'Tempat tidak boleh kosong.' })
                } else {
                  form.clearErrors('place')
                }
              }} error={form.errors.place} value={form.data.place} />
              
              <Select
                mb={16}
                value={form.data.athlete_id}
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
                nothingFoundMessage="Tidak ada atlet ditemukan"
                placeholder="Pilih atlet..."
                checkIconPosition="right"
                onChange={(value) => {
                  form.setData('athlete_id', value)
                  
                  if (!value) {
                    form.setError({ athlete_id: 'Atlet tidak boleh kosong.' })
                  } else {
                    form.clearErrors('athlete_id')
                  }
                }}
                data={props.athletes.map((athlete) => ({ value: athlete.user.id, label: `${athlete.user.full_name} (${athlete.user.role})` }))}
                error={form.errors.athlete_id}
              />
              
              <Select
                mb={16}
                value={form.data.coach_id}
                withAsterisk
                variant="filled"
                styles={{
                  label: { marginBottom: 8 },
                  input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                  section: { marginLeft: 0, width: 48, height: 48 },
                  error: { marginTop: 8 },
                }}
                leftSection={<IconUser />}
                label="Pelatih"
                clearable
                searchable
                nothingFoundMessage="Tidak ada pelatih ditemukan"
                placeholder="Pilih pelatih..."
                checkIconPosition="right"
                onChange={(value) => {
                  form.setData('coach_id', value)
                  
                  if (!value) {
                    form.setError({ coach_id: 'Pelatih tidak boleh kosong.' })
                  } else {
                    form.clearErrors('coach_id')
                  }
                }}
                data={props.coaches.map((coach) => ({ value: coach.user.id, label: `${coach.user.full_name} (${coach.user.role})` }))}
                error={form.errors.coach_id}
              />
              
              <DatePickerInput mb={16} locale="id" monthsListFormat="MMMM" withAsterisk clearable allowDeselect firstDayOfWeek={0} variant="filled"
                               valueFormat="dddd, D MMMM YYYY" leftSection={<IconCalendar />} label="Tanggal"
                               placeholder="Masukkan tanggal..."
                               styles={{
                                 label: { marginBottom: 8 },
                                 input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                                 section: { marginLeft: 0, width: 48, height: 48 },
                                 error: { marginTop: 8 },
                                 calendarHeader: { height: 48 },
                                 calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                               }} onChange={(value) => {
                form.setData('date', value.toLocaleString())
                
                if (!value) {
                  form.setError({ date: 'Tanggal latihan tidak boleh kosong.' })
                } else {
                  form.clearErrors('date')
                }
              }} error={form.errors.date} value={new Date(form.data.date)}
              />
              
              <TimeInput mb={16} color="gold.2" placeholder="HH:MM" locale="id" withAsterisk variant="filled"
                         leftSection={<IconClockPlay />} label="Waktu Mulai"
                         styles={{
                           label: { marginBottom: 8 },
                           input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                           section: { marginLeft: 0, width: 48, height: 48 },
                           error: { marginTop: 8 },
                           calendarHeader: { height: 48 },
                           calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                         }} onChange={(e) => {
                form.setData('start_time', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ start_time: 'Waktu mulai tidak boleh kosong.' })
                } else {
                  form.clearErrors('start_time')
                }
              }} error={form.errors.start_time} value={form.data.start_time} />
              
              <TimeInput color="gold.2" placeholder="HH:MM" locale="id" withAsterisk variant="filled"
                         leftSection={<IconClockPause />} label="Waktu Selesai"
                         styles={{
                           label: { marginBottom: 8 },
                           input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                           section: { marginLeft: 0, width: 48, height: 48 },
                           error: { marginTop: 8 },
                           calendarHeader: { height: 48 },
                           calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                         }} onChange={(e) => {
                form.setData('end_time', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ end_time: 'Waktu selesai tidak boleh kosong.' })
                } else {
                  form.clearErrors('end_time')
                }
              }} error={form.errors.end_time} value={form.data.end_time} />
            </Fieldset>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Edit
