import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Box, Fieldset, Grid, Group, Radio, TextInput } from '@mantine/core'
import { IconCalendar, IconId, IconMail } from '@tabler/icons-react'
import { useForm } from '@inertiajs/react'
import { DatePickerInput } from '@mantine/dates'
import 'dayjs/locale/id'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'

const Show = (props) => {
  const form = useForm({
    avatar: props.user.avatar,
    email: props.user.email,
    full_name: props.user.full_name,
    gender: props.user.gender,
    birth_date: props.user.birth_date,
    role: props.user.role,
  })
  
  return (
    <AppLayout title={`Pelatih '${props.user.full_name}'`} authed={props.auth.user} meta={props.meta}>
      <Box mb={32}>
        <Breadcrumbs navList={[{ label: 'Pelatih', route: 'coaches.index' }, { label: 'Rincian' }]} />
      </Box>
      
      <Grid justify="space-between">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Avatar mx="auto" src={form.data.avatar} alt={form.data.full_name} size={160} />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Fieldset mb={16} radius={20} legend="Informasi Akun" styles={{
            root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
          }}>
            <TextInput variant="filled" leftSection={<IconMail />} styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }} label="Alamat Surel" placeholder="Masukkan alamat surel..." value={form.data.email} disabled
            />
          </Fieldset>
          
          <Fieldset mb={16} radius={20} legend="Informasi Pribadi"
                    styles={{
                      root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
                      legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
                    }}>
            <TextInput variant="filled" leftSection={<IconId />} styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }} mb={16} disabled label="Nama Lengkap" placeholder="Masukkan nama lengkap..." value={form.data.full_name}
            />
            
            <Radio.Group value={form.data.gender} mb={16} label="Jenis Kelamin" styles={{
              label: { marginBottom: 8 }, error: { marginTop: 8 },
            }}>
              <Group gap={32}>
                <Radio size="md" value="Laki-laki" label="Laki-laki" color="gold.2" disabled />
                <Radio size="md" value="Perempuan" label="Perempuan" color="gold.2" disabled />
              </Group>
            </Radio.Group>
            
            <DatePickerInput locale="id" disabled variant="filled" valueFormat="dddd, D MMMM YYYY" leftSection={<IconCalendar />} label="Tanggal Lahir"
                             placeholder="Masukkan tanggal lahir..." styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
              calendarHeader: { height: 48 },
              calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
            }} value={new Date(form.data.birth_date)}
            />
          </Fieldset>
          
          <Fieldset
            radius={20}
            legend="Informasi Pelatih"
            styles={{
              root: { margin: 0, padding: 16, border: '1px solid #dcdcdc' },
              legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
            }}>
            <Radio.Group label="Peran" styles={{ label: { marginBottom: 8 }, error: { marginTop: 8 } }} value={form.data.role}>
              <Group gap={32}>
                <Radio value="Pengelola Tim" label="Pengelola Tim" color="gold.2" size="md" disabled />
                <Radio value="Pelatih Fisik" label="Pelatih Fisik" color="gold.2" size="md" disabled />
                <Radio value="Pelatih Teknik" label="Pelatih Teknik" color="gold.2" size="md" disabled />
              </Group>
            </Radio.Group>
          </Fieldset>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}

export default Show
