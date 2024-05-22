import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Avatar,
  Button,
  Divider,
  SimpleGrid,
  Table as MantineTable,
  TextInput,
} from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'

const Index = (props) => {
  const [coachSearch, setCoachSearch] = useState('')
  const THList = ['#', 'Foto', 'Nama Lengkap', 'Ditambahkan Pada', 'Diperbarui Pada', 'Aksi']
  const TDList = props.coaches.map((coach, id) => (
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
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Pelatih" authed={props.auth.user} meta={props.meta}>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
        }}
        spacing={{
          base: 16,
          sm: 0,
        }}
      >
        <Breadcrumbs navList={[{ label: 'Pelatih' }]} />
        
        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
          }}
          spacing={16}
        >
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
          />
          
          <Button
            leftSection={<IconPlus />}
            variant="filled"
            color="gold.1"
            h={48}
            radius={32}
            onClick={() => router.get(route('coaches.create'))}
          >
            Tambah Pelatih
          </Button>
        </SimpleGrid>
      </SimpleGrid>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
