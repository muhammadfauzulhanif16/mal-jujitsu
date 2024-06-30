import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Fieldset, Grid, Group, Indicator, MultiSelect, Select, SimpleGrid, TextInput } from '@mantine/core'
import { IconBuilding, IconCalendar, IconClipboardText, IconClockPause, IconClockPlay, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { DatePickerInput, TimeInput } from '@mantine/dates'

const Show = (props) => {
  const form = useForm({
    name: props.exercise.name,
    place: props.exercise.place,
    athlete_ids: props.exercise.athletes.map((athlete) => athlete.id),
    coach_id: props.exercise.coach.id,
    date: props.exercise.date,
    start_time: props.exercise.start_time,
    end_time: props.exercise.end_time,
  })
  console.log(props)
  return (
    <AppLayout title={`Latihan ${form.data.name ? `'${form.data.name}'` : ''}`} authed={props.auth.user} meta={props.meta}
               unreadHistories={props.total_unread_histories}>
      <Group w="100%" mb={32} justify="space-between">
        <Breadcrumbs navList={[{ label: 'Latihan', route: 'exercises.index' }, { label: 'Rincian' }]} />
      </Group>
      
      <Grid grow justify="space-between">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <SimpleGrid spacing={32} cols={{
            base: 1,
            xs: 2,
            md: 1,
          }}>
            <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.2"
                       label={
                         form.data.athlete_ids.length > 1 ? `${form.data.athlete_ids.length} Atlet` : 'Atlet'
                       }
                       position="bottom-center" size={32} withBorder>
              <Avatar.Group spacing={40} style={{
                display: 'flex',
                justifyContent: 'center',
              }}>
                <Avatar
                  src={props.athletes.find((athlete) => athlete.id === form.data.athlete_ids[0])?.avatar}
                  alt={props.athletes.find((athlete) => athlete.id === form.data.athlete_ids[0])?.full_name}
                  size={160}
                />
                
                {form.data.athlete_ids.length > 1 && (
                  <Avatar size={160}>
                    +{form.data.athlete_ids.length - 1}
                  </Avatar>
                )}
              </Avatar.Group>
            </Indicator>
            
            <Indicator inline color="gold.2" styles={{ indicator: { padding: 16 } }}
                       label={form.data.coach_id ? props.coaches.find((coach) => coach.id === form.data.coach_id)?.role : 'Pelatih'}
                       position="bottom-center" size={32} withBorder>
              <Avatar
                mx="auto"
                src={props.coaches.find((coach) => coach.id === form.data.coach_id)?.avatar}
                alt={props.coaches.find((coach) => coach.id === form.data.coach_id)?.full_name}
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
            <TextInput disabled variant="filled" leftSection={<IconClipboardText />} styles={{
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
            
            <TextInput disabled variant="filled" leftSection={<IconBuilding />} styles={{
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
            
            <MultiSelect
              mb={16}
              value={form.data.athlete_ids}
              hidePickedOptions
              disabled
              variant="filled"
              styles={{
                label: { marginBottom: 8 },
                input: { minHeight: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16, display: 'flex' },
                section: { marginLeft: 0, width: 48, minHeight: 48 },
                error: { marginTop: 8 },
              }}
              leftSection={<IconUser />}
              label="Atlet"
              clearable
              searchable
              nothingFoundMessage="Tidak ada atlet ditemukan"
              checkIconPosition="right"
              onChange={(value) => {
                form.setData('athlete_ids', value)
                
                if (value.length === 0) {
                  form.setError({ athlete_ids: 'Atlet tidak boleh kosong.' })
                } else {
                  form.clearErrors('athlete_ids')
                }
              }}
              data={props.athletes.map((athlete) => ({ value: athlete.id, label: `${athlete.full_name} (${athlete.role})` }))}
              error={form.errors.athlete_ids}
            />
            
            <Select
              mb={16}
              value={form.data.coach_id}
              disabled
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
              data={props.coaches.map((coach) => ({ value: coach.id, label: `${coach.full_name} (${coach.role})` }))}
              error={form.errors.coach_id}
            />
            
            <DatePickerInput mb={16} locale="id" monthsListFormat="MMMM" disabled clearable allowDeselect firstDayOfWeek={0} variant="filled"
                             valueFormat="D-M-YYYY" leftSection={<IconCalendar />} label="Tanggal"
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
            
            <TimeInput mb={16} color="gold.2" placeholder="HH:MM" locale="id" disabled variant="filled"
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
            
            <TimeInput color="gold.2" placeholder="HH:MM" locale="id" disabled variant="filled"
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
  )
}

export default Show
