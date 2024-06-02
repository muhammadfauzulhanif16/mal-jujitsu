import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Divider, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  const [tournamentSearch, setTournamentSearch] = useState('')
  const THList = ['#', 'Nama Pertandingan', 'Tempat Pertandingan', 'Atlet', 'Medali', 'Tanggal Pertandingan', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Atlet',
      icon: <IconEye />,
      onClick: (tournament) => router.get(route('tournaments.show', tournament.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Atlet',
      icon: <IconPencil />,
      onClick: (tournament) => router.get(route('tournaments.edit', tournament.id)),
      color: 'yellow',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Hapus Atlet',
      icon: <IconTrash />,
      onClick: (tournament) => router.delete(route('tournaments.destroy', tournament.id)),
      color: 'red',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
  ]
  const tournamentList = props.tournaments.filter((tournament) => {
    return tournament.name.toLowerCase().includes(tournamentSearch.toLowerCase())
  })
  const TDList = tournamentList.map((tournament, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {tournament.name}
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{tournament.place}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={16} align="center">
          <Avatar size={48} src={tournament.athlete.avatar} />
          
          {tournament.athlete.full_name}
        </Flex>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{tournament.medal}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{tournament.date}</MantineTable.Td>
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
                          onClick={() => action.onClick(tournament)}
                // disabled={props.auth.user.id === athlete.user.id || action.disabled}
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
    <AppLayout title="Pertandingan" authed={props.auth.user} meta={props.meta}>
      <Stack>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Pertandingan' }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.1"
                       placeholder="Cari pertandingan..." onChange={(e) => setTournamentSearch(e.target.value)} />
            
            {['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role) && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Pertandingan">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('tournaments.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.1" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('tournaments.create'))}>
                  Tambah Pertandingan
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.1"
                   placeholder="Cari atlet..." onChange={(e) => setTournamentSearch(e.target.value)} />
      </Stack>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
