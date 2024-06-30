import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconSearch, IconTrash, IconUsers } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'
import { router } from '@inertiajs/core'

const Index = (props) => {
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = ['#', 'Avatar', 'Nama Atlet', 'Sistem Pertandingan', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Penilaian',
      icon: <IconEye />,
      onClick: (athlete) => router.get(route('evaluations.show', athlete.exercise_evaluation_id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Penilaian',
      icon: <IconPencil />,
      onClick: (athlete) => router.get(route('evaluations.edit', athlete.exercise_evaluation_id)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Penilaian',
      icon: <IconTrash />,
      onClick: (athlete) => router.delete(route('evaluations.destroy', athlete.exercise_evaluation_id)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const athleteList = props.athletes.filter((athlete) => {
    return athlete.full_name.toLowerCase().includes(athleteSearch.toLowerCase())
  })
  const TDList = athleteList.map((athlete, id) => (
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
                          disabled={action.disabled}
              >
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title={`Penilaian '${props.exercise.name}'`} authed={props.auth.user} meta={props.meta} unreadHistories={props.total_unread_histories}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian', route: 'evaluations.index' }, {
            label: props.exercise.name, totalData: 0,
          }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} icon={<IconUsers size={48} />} title="Atlet" route="athletes.create" authed={props.auth.user} />
    </AppLayout>
  )
}

export default Index
