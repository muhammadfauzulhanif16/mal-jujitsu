import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Grid,
  Table as MantineTable,
  TextInput,
  Tooltip,
} from '@mantine/core'
import {
  IconEye,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'
import { router } from '@inertiajs/core'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'

const Index = (props) => {
  const [coachSearch, setCoachSearch] = useState('')
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Ditambahkan Pada', 'Diperbarui Pada', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Pelatih',
      icon: <IconEye />,
      onClick: (user) => router.get(route('coaches.show', user.id)),
      color: 'blue',
    },
    {
      label: 'Ubah Pelatih',
      icon: <IconPencil />,
      onClick: (user) => router.get(route('coaches.edit', user.id)),
      color: 'yellow',
    },
    {
      label: 'Hapus Pelatih',
      icon: <IconTrash />,
      onClick: (user) => router.delete(route('coaches.destroy', user.id)),
      color: 'red',
    },
  ]
  const coachList = props.coaches.filter((coach) => {
    return coach.user.full_name.toLowerCase().includes(coachSearch.toLowerCase())
  })
  const TDList = coachList.map((coach, id) => (
    <MantineTable.Tr h={48} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar src={coach.user.avatar} alt={coach.user.full_name} />
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{coach.user.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{coach.user.created_at}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{coach.user.updated_at}</MantineTable.Td>
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
                          onClick={() => action.onClick(coach.user)}
                          disabled={props.auth.user.id === coach.user.id}
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
    <AppLayout title="Pelatih" authed={props.auth.user} meta={props.meta}>
      <Grid
        grow
        justify="space-between"
      >
        <Grid.Col span={3}>
          <Breadcrumbs navList={[{ label: 'Pelatih' }]} />
        </Grid.Col>
        
        <Grid.Col
          span={3}
          style={{
            display: 'flex',
          }}
        >
          <Button
            ml="auto"
            leftSection={<IconPlus />}
            variant="filled"
            color="gold.1"
            h={48}
            radius={32}
            onClick={() => router.get(route('coaches.create'))}
          >
            Tambah Pelatih
          </Button>
        </Grid.Col>
        
        <Grid.Col span={12}>
          <TextInput
            variant="filled"
            leftSection={<IconSearch />}
            styles={{
              input: {
                height: 48,
                borderRadius: 32,
                paddingLeft: 50,
                paddingRight: 14,
              },
              section: {
                marginLeft: 8,
              },
            }}
            color="gold.1"
            placeholder="Cari atlet..."
            onChange={(e) => setCoachSearch(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
