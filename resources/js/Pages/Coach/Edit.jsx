import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Fieldset, FileButton, Grid, Group, Radio, TextInput, Tooltip } from '@mantine/core'
import { IconCalendar, IconCornerDownLeft, IconId, IconMail, IconPassword, IconPhotoUp } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/id'

const Edit = (props) => {
  const form = useForm({
    _method: 'put',
    avatar: props.coach.avatar,
    email: props.coach.email,
    password: '',
    full_name: props.coach.full_name,
    gender: props.coach.gender,
    birth_date: props.coach.birth_date,
    role: props.coach.role,
  })
  console.log(props)
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('coaches.update', props.coach.id))
    }}>
      <AppLayout title={`Pelatih ${form.data.full_name ? `'${form.data.full_name}'` : ''}`} authed={props.auth.user} meta={props.meta}
                 unreadHistories={props.total_unread_histories}>
        <Group w="100%" mb={32} justify="space-between">
          <Breadcrumbs navList={[{ label: 'Pelatih', route: 'coaches.index' }, { label: 'Ubah' }]} />
          
          <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Ubah Pelatih">
            <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', xs: 'none' }}
                        disabled={form.hasErrors || Object.entries(form.data).some(([key, value]) => key !== 'password' && key !== 'avatar' && !value)}>
              <IconCornerDownLeft />
            </ActionIcon>
          </Tooltip>
          
          <Button w={240} display={{ base: 'none', xs: 'block' }} type="submit" fullWidth leftSection={<IconCornerDownLeft />} variant="filled" color="gold.2"
                  h={48}
                  radius={32} px={16} styles={{ section: { marginRight: 12 } }} loading={form.processing}
                  disabled={form.hasErrors || Object.entries(form.data).some(([key, value]) => key !== 'password' && key !== 'avatar' && !value)}>
            Ubah Pelatih
          </Button>
        </Group>
        
        <Grid justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Avatar mx="auto" mb={16} src={form.data.avatar instanceof File ? URL.createObjectURL(form.data.avatar) : form.data.avatar}
                    alt={form.data.full_name} size={160} />
            
            <FileButton onChange={(file) => form.setData('avatar', file)} accept="image/png,image/jpeg,image/jpg">
              {(props) => (
                <Button px={16} styles={{ section: { marginRight: 12 } }} variant="subtle" {...props} color="gold.2" h={48} radius={32} fullWidth
                        leftSection={<IconPhotoUp />}>
                  Unggah Foto
                </Button>
              )}
            </FileButton>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Fieldset mb={16} radius={20} legend="Informasi Akun"
                      styles={{
                        root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
                        legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
                      }}>
              <TextInput withAsterisk variant="filled" leftSection={<IconMail />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Alamat Surel" placeholder="Masukkan alamat surel..." onChange={(e) => {
                form.setData('email', e.target.value.toLowerCase())
                
                if (!e.target.value) {
                  form.setError({ email: 'Alamat surel tidak boleh kosong.' })
                } else {
                  form.clearErrors('email')
                }
              }} error={form.errors.email} value={form.data.email}
              />
              
              <TextInput variant="filled" type="password" leftSection={<IconPassword />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} label="Kata Sandi" placeholder="Masukkan kata sandi..." onChange={(e) => {
                form.setData('password', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ password: 'Kata sandi tidak boleh kosong.' })
                } else {
                  form.clearErrors('password')
                }
              }} error={form.errors.password} />
            </Fieldset>
            
            <Fieldset radius={20} mb={20} legend="Informasi Pribadi"
                      styles={{
                        root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
                        legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
                      }}>
              <TextInput withAsterisk variant="filled" leftSection={<IconId />} styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }} mb={16} label="Nama Lengkap" placeholder="Masukkan nama lengkap..." onChange={(e) => {
                const value = e.target.value.replace(/\b\w/g, char => char.toUpperCase()).replace(/\B\w/g, char => char.toLowerCase())
                form.setData('full_name', value)
                
                if (!value) {
                  form.setError({ full_name: 'Nama lengkap tidak boleh kosong.' })
                } else {
                  form.clearErrors('full_name')
                }
              }} error={form.errors.full_name} value={form.data.full_name}
              />
              
              
              <Radio.Group value={form.data.gender} mb={16} label="Jenis Kelamin" withAsterisk styles={{
                label: { marginBottom: 8 }, error: { marginTop: 8 },
              }} onChange={(value) => {
                form.setData('gender', value)
                
                if (!value) {
                  form.setError({ role: 'Jenis kelamin tidak boleh kosong.' })
                } else {
                  form.clearErrors('gender')
                }
              }}>
                <Group gap={32}>
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.gender === 'Laki-laki' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Laki-laki" label="Laki-laki" color="gold.2" />
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.gender === 'Perempuan' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Perempuan" label="Perempuan" color="gold.2" />
                </Group>
              </Radio.Group>
              
              <DatePickerInput locale="id" monthsListFormat="MMMM" withAsterisk clearable allowDeselect firstDayOfWeek={0} variant="filled"
                               valueFormat="D-M-YYYY" leftSection={<IconCalendar />} label="Tanggal Lahir" placeholder="Masukkan tanggal lahir..."
                               styles={{
                                 label: { marginBottom: 8 },
                                 input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                                 section: { marginLeft: 0, width: 48, height: 48 },
                                 error: { marginTop: 8 },
                                 calendarHeader: { height: 48 },
                                 calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                               }} onChange={(value) => {
                form.setData('birth_date', value.toLocaleString())
                
                if (!value) {
                  form.setError({
                    birth_date:
                      'Tanggal lahir tidak boleh kosong.',
                  })
                } else {
                  form.clearErrors('birth_date')
                }
              }} error={form.errors.birth_date} value={new Date(form.data.birth_date)}
              />
            </Fieldset>
            
            <Fieldset radius={20} legend="Informasi Pelatih"
                      styles={{
                        root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
                        legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
                      }}
            >
              <Radio.Group label="Peran" withAsterisk styles={{ label: { marginBottom: 8 }, error: { marginTop: 8 } }} onChange={(value) => {
                form.setData('role', value)
                
                if (!value) {
                  form.setError({ role: 'Peran tidak boleh kosong.' })
                } else {
                  form.clearErrors('role')
                }
              }} error={form.errors.role} value={form.data.role}>
                <Group gap={32}>
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.role === 'Manajer Tim' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Manajer Tim" label="Manajer Tim" color="gold.2" />
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.role === 'Pelatih Fisik' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Pelatih Fisik" label="Pelatih Fisik" color="gold.2" />
                  <Radio styles={{
                    label: { marginLeft: 16, padding: 0, fontSize: 14 },
                    radio: { border: 0, backgroundColor: form.data.role === 'Pelatih Teknik' ? 'var(--mantine-color-gold-2)' : '#f1f3f5' },
                  }} size="md" value="Pelatih Teknik" label="Pelatih Teknik" color="gold.2" />
                </Group>
              </Radio.Group>
            </Fieldset>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Edit
