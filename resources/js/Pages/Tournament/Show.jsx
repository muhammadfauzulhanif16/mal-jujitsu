import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Center, Divider, Fieldset, Grid, Group, Indicator, Radio, Select, TextInput } from '@mantine/core'
import { IconBuilding, IconClipboardText, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useForm } from '@inertiajs/react'
import 'dayjs/locale/id'

const Edit = (props) => {
  const form = useForm({ name: props.tournament.name, place: props.tournament.place, athlete_id: props.tournament.athlete.id, medal: props.tournament.medal })
  
  return (
    <AppLayout title="Turnamen" authed={props.auth.user} meta={props.meta}>
      <Breadcrumbs navList={[{ label: 'Turnamen', route: 'tournaments.index' }, { label: 'Rincian' }]} />
      
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
          <Fieldset mb={16} radius={20} legend="Informasi Turnamen"
                    styles={{ root: { margin: 0, padding: 16 }, legend: { borderRadius: 20, fontSize: 16, padding: 16, fontWeight: 'bold' } }}>
            
            <TextInput disabled variant="filled" leftSection={<IconClipboardText />} styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }} mb={16} label="Nama Turnamen" placeholder="Masukkan nama turnamen..." value={form.data.name} />
            
            <TextInput disabled variant="filled" leftSection={<IconBuilding />} styles={{
              label: { marginBottom: 8 },
              input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
              section: { marginLeft: 0, width: 48, height: 48 },
              error: { marginTop: 8 },
            }} mb={16} label="Tempat Turnamen" placeholder="Masukkan tempat turnamen..." value={form.data.place} />
            
            <Select
              disabled
              value={form.data.athlete_id}
              mb={16}
              variant="filled"
              styles={{
                label: { marginBottom: 8 },
                input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                section: { marginLeft: 0, width: 48, height: 48 },
                error: { marginTop: 8 },
              }}
              leftSection={<IconUser />}
              label="Atlet"
              data={props.athletes.map((athlete) => ({ value: athlete.user.id, label: `${athlete.user.full_name} (${athlete.user.role})` }))}
            />
            
            <Radio.Group value={form.data.medal} label="Medali" styles={{
              label: { marginBottom: 8 }, error: { marginTop: 8 },
            }}>
              <Group gap={32}>
                <Radio size="md" value="Emas" label="🥇 Emas" color="gold.1" disabled />
                <Radio size="md" value="Perak" label="🥈 Perak" color="gold.1" disabled />
                <Radio size="md" value="Perunggu" label="🥉 Perunggu" color="gold.1" disabled />
              </Group>
            </Radio.Group>
          </Fieldset>
        </Grid.Col>
      </Grid>
    </AppLayout>
  )
}

export default Edit
