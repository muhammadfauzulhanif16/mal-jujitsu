import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Center, Divider, Fieldset, Grid, Group, Indicator, Radio, Select, TextInput, Tooltip } from '@mantine/core'
import { IconBuilding, IconClipboardText, IconCornerDownLeft, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'

const Create = (props) => {
  const form = useForm({ name: '', place: '', athlete_id: '', medal: '' })
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      form.post(route('tournaments.store'))
    }}>
      <AppLayout title="Pertandingan" authed={props.auth.user} meta={props.meta}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Pertandingan', route: 'tournaments.index' }, { label: 'Tambah' }]} />
          
          <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Pertandingan">
            <ActionIcon type="submit" ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', xs: 'none' }}
                        disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.medal}>
              <IconCornerDownLeft />
            </ActionIcon>
          </Tooltip>
          
          <Button display={{ base: 'none', xs: 'block' }} type="submit" w={240} leftSection={<IconCornerDownLeft />} variant="filled" color="gold.1" h={48}
                  px={16} styles={{ section: { marginRight: 12 } }} radius={32} loading={form.processing}
                  disabled={form.hasErrors || !form.data.name || !form.data.place || !form.data.athlete_id || !form.data.medal}>
            Tambah Latihan
          </Button>
        </Group>
        
        <Divider my={32} />
        
        <Grid grow justify="space-between">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Center>
              <Indicator styles={{ indicator: { padding: 16, border: '4px solid white' } }} inline color="gold.1"
                         label={form.data.athlete_id ? props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.role : 'Atlet'}
                         position="bottom-center" size={32} withBorder>
                <Avatar
                  mx="auto"
                  src={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.avatar}
                  alt={props.athletes.find((athlete) => athlete.user.id === form.data.athlete_id)?.user.full_name}
                  size={160}
                />
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
              }} mb={16} label="Nama Pertandingan" placeholder="Masukkan nama pertandingan..." onChange={(e) => {
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
              }} mb={16} label="Tempat Pertandingan" placeholder="Masukkan tempat pertandingan..." onChange={(e) => {
                form.setData('place', e.target.value)
                
                if (!e.target.value) {
                  form.setError({ place: 'Nama tempat tidak boleh kosong.' })
                } else {
                  form.clearErrors('place')
                }
              }} error={form.errors.place} />
              
              <Select
                mb={16}
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
              
              <Radio.Group label="Medali" withAsterisk styles={{
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
                  <Radio size="md" value="Emas" label="🥇 Emas" color="gold.1" />
                  <Radio size="md" value="Perak" label="🥈 Perak" color="gold.1" />
                  <Radio size="md" value="Perunggu" label="🥉 Perunggu" color="gold.1" />
                </Group>
              </Radio.Group>
            </Fieldset>
          </Grid.Col>
        </Grid>
      </AppLayout>
    </form>
  )
}

export default Create
