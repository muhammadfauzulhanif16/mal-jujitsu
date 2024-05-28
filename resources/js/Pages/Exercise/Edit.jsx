import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Divider, Fieldset, Grid, Indicator, Select, SimpleGrid, TextInput, Tooltip } from '@mantine/core'
import { IconBuilding, IconCalendar, IconClipboardText, IconClockPause, IconClockPlay, IconCornerDownLeft, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { DatePickerInput, TimeInput } from '@mantine/dates'

const Edit = (props) => {
  const form = useForm({ name: '', place: '', athlete_id: '', coach_id: '', date: '', start_time: '', end_time: '' })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      
      form.post(route('exercises.store'))
    }}>
      <AppLayout title="Latihan" authed={props.auth.user} meta={props.meta}>
        <Grid justify="space-between">
          <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
            <Breadcrumbs navList={[{ label: 'Latihan', route: 'exercises.index' }, { label: 'Tambah' }]} />
          </Grid.Col>
          
          <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
            <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Latihan">
              <ActionIcon type="submit" ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', xs: 'none' }}
                          disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.coach_id || !form.data.date || !form.data.start_time || !form.data.end_time}>
                <IconCornerDownLeft />
              </ActionIcon>
            </Tooltip>
            
            <Button display={{ base: 'none', xs: 'block' }} type="submit" fullWidth leftSection={<IconCornerDownLeft />} variant="filled" color="gold.1" h={48}
                    px={16} styles={{ section: { marginRight: 12 } }} radius={32} loading={form.processing}
                    disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.coach_id || !form.data.date || !form.data.start_time || !form.data.end_time}>
              Tambah Latihan
            </Button>
          </Grid.Col>
        </Grid>
        
        <Divider my={32} />
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <SimpleGrid spacing={32} cols={{
              base: 1,
              xs: 2,
              md: 1,
            }}>
              <Indicator inline color="gold.1"
                         label={form.data.athlete_id ? props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.role : 'Atlet'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.avatar}
                  alt={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.full_name}
                  size={160}
                />
              </Indicator>
              
              <Indicator inline color="gold.1"
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
                      styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
              <Grid>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <TextInput withAsterisk variant="filled" leftSection={<IconClipboardText />} styles={{
                    label: { marginBottom: 8 },
                    input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                    section: { marginLeft: 0, width: 48, height: 48 },
                    error: { marginTop: 8 },
                  }} mb={16} label="Nama Latihan" placeholder="Masukkan nama latihan..." onChange={(e) => {
                    form.setData('name', e.target.value)
                    
                    if (!e.target.value) {
                      form.setError({ name: 'Nama latihan tidak boleh kosong.' })
                    } else {
                      form.clearErrors('name')
                    }
                  }} error={form.errors.name} />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <TextInput withAsterisk variant="filled" leftSection={<IconBuilding />} styles={{
                    label: { marginBottom: 8 },
                    input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                    section: { marginLeft: 0, width: 48, height: 48 },
                    error: { marginTop: 8 },
                  }} mb={16} label="Nama Tempat" placeholder="Masukkan nama tempat..." onChange={(e) => {
                    form.setData('place', e.target.value)
                    
                    if (!e.target.value) {
                      form.setError({ place: 'Nama tempat tidak boleh kosong.' })
                    } else {
                      form.clearErrors('place')
                    }
                  }} error={form.errors.place} />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, xs: 6 }}>
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
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, xs: 6 }}>
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
                </Grid.Col>
                
                <Grid.Col span={12}>
                  <DatePickerInput locale="id" monthsListFormat="MMMM" withAsterisk clearable allowDeselect firstDayOfWeek={0} variant="filled"
                                   valueFormat="dddd, D MMMM YYYY" leftSection={<IconCalendar />} label="Tanggal Latihan"
                                   placeholder="Masukkan tanggal latihan..."
                                   styles={{
                                     label: { marginBottom: 8 },
                                     input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                                     section: { marginLeft: 0, width: 48, height: 48 },
                                     error: { marginTop: 8 },
                                     calendarHeader: { height: 48 },
                                     calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                                   }} onChange={(value) => {
                    form.setData('date', value)
                    
                    if (!value) {
                      form.setError({ date: 'Tanggal latihan tidak boleh kosong.' })
                    } else {
                      form.clearErrors('date')
                    }
                  }} error={form.errors.date}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <TimeInput color="gold.1" placeholder="HH:MM" locale="id" withAsterisk variant="filled"
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
                  }} error={form.errors.start_time} />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <TimeInput color="gold.1" placeholder="HH:MM" locale="id" withAsterisk variant="filled"
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
                  }} error={form.errors.end_time}
                  />
                </Grid.Col>
              </Grid>
            </Fieldset>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Edit
