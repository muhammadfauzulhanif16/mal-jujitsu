import { AppLayout } from '@/Layouts/AppLayout.jsx'
import {
  Button,
  Divider,
  SimpleGrid,
  Table as MantineTable,
  TextInput,
} from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  const THList = ['#', 'Nama Lengkap', 'Ditambahkan Pada', 'Diperbarui Pada', 'Aksi']
  const TDList = props.athletes.map((athlete, id) => (
    <MantineTable.Tr h={48} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whitespace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whitespace: 'nowrap' }}>{athlete.user.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whitespace: 'nowrap' }}>{athlete.user.created_at}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whitespace: 'nowrap' }}>{athlete.user.updated_at}</MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Atlet" authed={props.auth.user} meta={props.meta}>
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
        
        <Breadcrumbs navList={[{ label: 'Atlet' }]} />
        
        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
          }}
          spacing={16}
        >
          <TextInput
            leftSection={<IconSearch />}
            styles={{
              input: {
                height: 48,
                borderRadius: 16,
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
            radius={16}
          >
            Tambah Atlet
          </Button>
        </SimpleGrid>
      </SimpleGrid>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
