import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Center, Fieldset, Grid, Group, Indicator, MultiSelect, Radio, TextInput, Tooltip } from '@mantine/core'
import { IconBuilding, IconCalendar, IconClipboardText, IconCornerDownLeft, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'
import { DatePickerInput } from '@mantine/dates'

const Create = (props) => {
  const form = useForm({ name: '', place: '', date: '', athlete_ids: [], medal: '' })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('tournaments.store'))
    }}>
      <AppLayout title="Pertandingan" authed={props.auth.user} meta={props.meta} unreadHistories={props.unread_histories.length}>
        <Group w="100%" mb={32} justify="space-between">
          <Breadcrumbs navList={[{ label: 'Pertandingan', route: 'tournaments.index' }, { label: 'Tambah' }]} />
          
          <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Pertandingan">
            <ActionIcon type="submit" ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', xs: 'none' }}
                        disabled={form.hasErrors || Object.values(form.data).some(field => !field)}>
              <IconCornerDownLeft />
            </ActionIcon>
          </Tooltip>
          
          <Button display={{ base: 'none', xs: 'block' }} type="submit" w={240} leftSection={<IconCornerDownLeft />} variant="filled" color="gold.2" h={48}
                  px={16} styles={{ section: { marginRight: 12 } }} radius={32} loading={form.processing}
                  disabled={form.hasErrors || Object.values(form.data).some(field => !field)}>
            Tambah Pertandingan
          </Button>
        </Group>
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Center>
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
                    src={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_ids[0])?.user.avatar}
                    alt={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_ids[0])?.user.full_name}
                    size={160}
                  />
                  
                  {form.data.athlete_ids.length > 1 && (
                    <Avatar size={160}>
                      +{form.data.athlete_ids.length - 1}
                    </Avatar>
                  )}
                </Avatar.Group>
              </Indicator>
            </Center>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Fieldset mb={16} radius={20} legend="Informasi Pertandingan"
                      styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
              
              <TextInput withAsterisk variant="filled" leftSection={<IconClipboardText />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Nama" placeholder="Masukkan nama..." onChange={(e) => {
                form.setData('name', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ name: 'Nama latihan tidak boleh kosong.' })
                } else {
                  form.clearErrors('name')
                }
              }} error={form.errors.name} />
              
              <TextInput withAsterisk variant="filled" leftSection={<IconBuilding />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Tempat" placeholder="Masukkan tempat..." onChange={(e) => {
                form.setData('place', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ place: 'Nama tempat tidak boleh kosong.' })
                } else {
                  form.clearErrors('place')
                }
              }} error={form.errors.place} />
              
              <MultiSelect
                hidePickedOptions
                mb={16}
                withAsterisk
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
                placeholder="Pilih 1 atlet atau lebih..."
                checkIconPosition="right"
                onChange={(value) => {
                  form.setData('athlete_ids', value)
                  
                  if (value.length === 0) {
                    form.setError({ athlete_ids: 'Atlet tidak boleh kosong.' })
                  } else {
                    form.clearErrors('athlete_ids')
                  }
                }}
                data={props.athletes.map((athlete) => ({ value: athlete.user.id, label: `${athlete.user.full_name} (${athlete.user.role})` }))}
                error={form.errors.athlete_id}
              />
              
              <Radio.Group mb={16} label="Medali" withAsterisk styles={{
                label: { marginBottom: 8 }, error: { marginTop: 8 },
              }} onChange={(value) => {
                form.setData('medal', value)
                
                if (!value) {
                  form.setError({ medal: 'Peran tidak boleh kosong.' })
                } else {
                  form.clearErrors('medal')
                }
              }}>
                <Group gap={32}>
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.medal === 'Emas' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Emas" label="🥇 Emas" color="gold.2" />
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.medal === 'Perak' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Perak" label="🥈 Perak" color="gold.2" />
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.medal === 'Perunggu' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Perunggu" label="🥉 Perunggu" color="gold.2" />
                </Group>
              </Radio.Group>
              
              <DatePickerInput mb={16} locale="id" monthsListFormat="MMMM" withAsterisk clearable allowDeselect firstDayOfWeek={0} variant="filled"
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
                  form.setError({ date: 'Tanggal tidak boleh kosong.' })
                } else {
                  form.clearErrors('date')
                }
              }} error={form.errors.date}
              />
            </Fieldset>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Create
