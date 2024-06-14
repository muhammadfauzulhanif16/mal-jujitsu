import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log(props)
  const [exerciseSearch, setExerciseSearch] = useState('')
  const THList = ['#', 'Nama', 'Tempat', 'Atlet', 'Pelatih', 'Tanggal', 'Waktu Mulai', 'Waktu Selesai', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Latihan',
      icon: <IconEye />,
      onClick: (exercise) => router.get(route('exercises.show', exercise.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Latihan',
      icon: <IconPencil />,
      onClick: (exercise) => router.get(route('exercises.edit', exercise.id)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Latihan',
      icon: <IconTrash />,
      onClick: (exercise) => router.delete(route('exercises.destroy', exercise.id)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const exerciseList = props.exercises.filter((exercise) => {
    return exercise.name.toLowerCase().includes(exerciseSearch.toLowerCase())
  })
  const TDList = exerciseList.map((exercise, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {exercise.name}
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.place}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={16} align="center">
          <Avatar size={48} src={exercise.athlete.user.avatar} />
          
          {exercise.athlete.user.full_name}
        </Flex>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={16} align="center">
          <Avatar size={48} src={exercise.coach.user.avatar} />
          
          {exercise.coach.user.full_name}
        </Flex>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.date}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.start_time}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exercise.end_time}</MantineTable.Td>
      <MantineTable.Td px={16} py={0} style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={8} style={{ whiteSpace: 'nowrap' }}>
          {actionList.map((action, id) => (
            <Tooltip label={action.label} key={id} style={{ borderRadius: 32, padding: '.5rem 1rem' }}>
              <ActionIcon size={48} radius={32} variant="subtle" aria-label={action.label} color={action.color} onClick={() => action.onClick(exercise)}
                          disabled={action.disabled}>
                {action.icon}
              </ActionIcon>
            </Tooltip>
          ))}
        </Flex>
      </MantineTable.Td>
    </MantineTable.Tr>
  ))
  
  return (
    <AppLayout title="Latihan" authed={props.auth.user} meta={props.meta}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Latihan', totalData: props.exercises.length }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.2"
                       placeholder="Cari latihan..." onChange={(e) => setExerciseSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Latihan">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.2" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('exercises.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.2" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('exercises.create'))}>
                  Tambah Latihan
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.2"
                   placeholder="Cari atlet..." onChange={(e) => setExerciseSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
