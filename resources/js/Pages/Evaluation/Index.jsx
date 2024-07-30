import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPlus, IconReportAnalytics, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log(props)
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = [{ title: '#' }, { title: 'Foto' }, { title: 'Nama Lengkap', key: 'full_name' }, {
    title: 'Sistem Pertandingan',
    key: 'role',
  }, { title: 'Total Penilaian', key: 'total_evaluations' }, { title: 'Aksi' }]
  const actionList = [
    {
      label: 'Daftar Penilaian',
      icon: <IconEye />,
      onClick: (athlete) => router.get(route('evaluations.users.index', athlete)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    // {
    //   label: 'Ubah Penilaian',
    //   icon: <IconPencil />,
    //   onClick: (evaluation) => router.get(route('evaluations.edit', evaluation)),
    //   color: 'yellow',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
    // {
    //   label: 'Hapus Penilaian',
    //   icon: <IconTrash />,
    //   onClick: (evaluation) => router.delete(route('evaluations.destroy', evaluation)),
    //   color: 'red',
    //   disabled: !props.auth.user.role.includes('Pelatih'),
    // },
  ]
  const athleteList = props.athletes
    .filter(athlete => athlete.full_name.replace(/\s/g, '').toLowerCase().match(new RegExp(athleteSearch.replace(/\s/g, '').toLowerCase(), 'i')))
  const [sortedData, setSortedData] = useState(athleteList.map(athlete => ({
    ...athlete,
    total_evaluations: athlete.total_evaluations.toString(),
  })))
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
        style={{ whiteSpace: 'nowrap' }}>{athlete.total_evaluations}</MantineTable.Td>
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
    <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian', totalData: props.athletes.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari latihan..." onChange={(e) => setAthleteSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Penilaian">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('evaluations.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('evaluations.create'))}>
                  Tambah Penilaian
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => athleteSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconReportAnalytics size={48} />} title="Penilaian" route="evaluations.create" authed={props.auth.user}
             data={sortedData}
             handleSort={handleSort} />
    </AppLayout>
  )
}

export default Index
