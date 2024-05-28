import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Divider, Grid, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'
import { router } from '@inertiajs/core'

const Index = (props) => {
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Bidang Pertandingan', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Atlet',
      icon: <IconEye />,
      onClick: (user) => router.get(route('athletes.show', user.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Atlet',
      icon: <IconPencil />,
      onClick: (user) => router.get(route('athletes.edit', user.id)),
      color: 'yellow',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Hapus Atlet',
      icon: <IconTrash />,
      onClick: (user) => router.delete(route('athletes.destroy', user.id)),
      color: 'red',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
  ]
  const athleteList = props.athletes
    .filter(athlete => athlete.user.full_name.toLowerCase().includes(athleteSearch.toLowerCase()))
    .sort((a, b) => a.user.full_name.localeCompare(b.user.full_name))
  const TDList = athleteList.map((athlete, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar src={athlete.user.avatar} alt={athlete.user.full_name} />
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.user.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.user.role}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Button.Group>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{
              borderRadius: 32,
              padding: '.5rem 1rem',
            }}>
              <ActionIcon size={48} radius={32} variant="subtle"
                          aria-label={action.label} color={action.color}
                          onClick={() => action.onClick(athlete.user)}
                          disabled={props.auth.user.id === athlete.user.id || action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Button.Group>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Atlet" authed={props.auth.user} meta={props.meta}>
      <Grid justify="space-between">
        <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
          <Breadcrumbs navList={[{ label: 'Atlet' }]} />
        </Grid.Col>
        
        {['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role) && (
          <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
            <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Atlet">
              <ActionIcon ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', xs: 'none' }}
                          onClick={() => router.get(route('athletes.create'))}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
            
            <Button display={{ base: 'none', xs: 'block' }} fullWidth leftSection={<IconPlus />} variant="filled" color="gold.1" h={48} radius={32} px={16}
                    styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('athletes.create'))}>
              Tambah Atlet
            </Button>
          </Grid.Col>
        )}
        
        <Grid.Col span={12}>
          <TextInput variant="filled" leftSection={<IconSearch />}
                     styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                     color="gold.1"
                     placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
        </Grid.Col>
      </Grid>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
