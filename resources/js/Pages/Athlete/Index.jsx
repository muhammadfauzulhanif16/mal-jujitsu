import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash, IconUser } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Table } from '@/Components/Table.jsx'
import { useState } from 'react'
import { router } from '@inertiajs/core'

const Index = (props) => {
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = [{ title: '#' }, { title: 'Foto' }, { title: 'Nama Lengkap', key: 'full_name' }, {
    title: 'Sistem Pertandingan',
    key: 'role',
  }, { title: 'Aksi' }]
  const actionList = [
    {
      label: 'Rincian Atlet',
      icon: <IconEye />,
      onClick: (id) => router.get(route('athletes.show', id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Atlet',
      icon: <IconPencil />,
      onClick: (id) => router.get(route('athletes.edit', id)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Atlet',
      icon: <IconTrash />,
      onClick: (id) => router.delete(route('athletes.destroy', id)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const athleteList = props.athletes
    .filter(athlete => athlete.full_name.replace(/\s/g, '').toLowerCase().match(new RegExp(athleteSearch.replace(/\s/g, '').toLowerCase(), 'i')))
  const [sortedData, setSortedData] = useState(athleteList)
  const TDList = sortedData.map((athlete, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Avatar src={athlete.avatar} alt={athlete.full_name} />
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.full_name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{athlete.role}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{
              borderRadius: 32,
              padding: '.5rem 1rem',
            }}>
              <ActionIcon size={48} radius={32} variant="subtle"
                          aria-label={action.label} color={action.color}
                          onClick={() => action.onClick(athlete)}
                          disabled={props.auth.user.id === athlete.id || action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  const handleSort = (sortedData) => {
    setSortedData(sortedData)
  }
  
  return (
    <AppLayout title="Atlet" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Atlet', totalData: props.athletes.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Atlet">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('athletes.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('athletes.create'))}>
                  Tambah Atlet
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2" placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconUser size={48} />} title="Atlet" route="athletes.create" authed={props.auth.user} data={athleteList}
             handleSort={handleSort} />
    </AppLayout>
  )
}

export default Index
