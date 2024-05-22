import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Box, Button, Divider, SimpleGrid, TextInput } from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  const THList = ['#', 'Nama Lengkap', 'Jenis Kelamin', 'Kategori', 'Aksi']
  
  return (
    <AppLayout title="Atlet" authed={props.auth.user} meta={props.meta}>
      <Box px={{
        base: 16,
        sm: 32,
        md: 48,
        lg: 64,
      }}
           py={32}
      >
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
        
        <Table />
      </Box>
    </AppLayout>
  )
}

export default Index
