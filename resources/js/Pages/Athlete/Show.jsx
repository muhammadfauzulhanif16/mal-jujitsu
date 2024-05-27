import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Divider, Fieldset, Grid, Group, NumberInput, Radio, TextInput } from '@mantine/core'
import { IconCalendar, IconId, IconMail, IconWeight } from '@tabler/icons-react'
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
    weight: props.user.athlete.weight,
    role: props.user.role,
  })
  console.log(props)
  return (
    <AppLayout title="Atlet" authed={props.auth.user} meta={props.meta}>
      <Breadcrumbs navList={[{ label: 'Atlet', route: 'athletes.index' }, { label: 'Rincian' }]} />
      
      <Divider my={32} />
      
      <Grid justify="space-between">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Avatar mx="auto" src={form.data.avatar} alt={form.data.full_name} size={160} />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Fieldset mb={16} radius={20} legend="Informasi Akun" styles={{
            root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' },
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
                    styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
            <TextInput variant="filled" leftSection={<IconId />} styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }} mb={16} disabled label="Nama Lengkap" placeholder="Masukkan nama lengkap..." value={form.data.full_name}
            />
            
            <Radio.Group value={form.data.gender} mb={16} label="Jenis Kelamin" withAsterisk styles={{
              label: { marginBottom: 8 }, error: { marginTop: 8 },
            }}>
              <Group gap={32}>
                <Radio size="md" value="Laki-laki" label="Laki-laki" color="gold.1" disabled />
                <Radio size="md" value="Perempuan" label="Perempuan" color="gold.1" disabled />
              </Group>
            </Radio.Group>
            
            <DatePickerInput mb={16} locale="id" disabled variant="filled" valueFormat="dddd, D MMMM YYYY" leftSection={<IconCalendar />} label="Tanggal Lahir"
                             placeholder="Masukkan tanggal lahir..." styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
              calendarHeader: { height: 48 },
              calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
            }} value={new Date(form.data.birth_date)} />
            
            <NumberInput disabled value={form.data.weight} decimalSeparator="," suffix=" kg" hideControls
                         variant="filled"
                         leftSection={<IconWeight />}
                         styles={{
                           label: { marginBottom: 8 },
                           input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                           section: { marginLeft: 0, width: 48, height: 48 },
                           error: { marginTop: 8 },
                         }} label="Berat Badan" />
          </Fieldset>
          
          <Fieldset
            radius={20}
            legend="Informasi Pelatih"
            styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
            <Radio.Group label="Peran" styles={{ label: { marginBottom: 8 }, error: { marginTop: 8 } }} value={form.data.role}>
              <Group gap={32}>
                <Radio size="md" value="Ne-Waza" label="Ne-Waza" color="gold.1" disabled />
                <Radio size="md" value="Fighting" label="Fighting" color="gold.1" disabled />
              </Group>
            </Radio.Group>
          </Fieldset>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}

export default Show
