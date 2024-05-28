import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Avatar, Button, Divider, Flex, Grid, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log(props)
  const [exerciseSearch, setExerciseSearch] = useState('')
  const THList = ['#', 'Nama Latihan', 'Tempat Latihan', 'Atlet', 'Pelatih', 'Tanggal Latihan', 'Waktu Mulai', 'Waktu Selesai', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Atlet',
      icon: <IconEye />,
      onClick: (exercise) => router.get(route('exercises.show', exercise.id)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Atlet',
      icon: <IconPencil />,
      onClick: (exercise) => router.get(route('exercises.edit', exercise.id)),
      color: 'yellow',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Hapus Atlet',
      icon: <IconTrash />,
      onClick: (exercise) => router.delete(route('exercises.destroy', exercise.id)),
      color: 'red',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
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
          <Avatar size={48} src={exercise.athlete.avatar} />
          
          {exercise.athlete.full_name}
        </Flex>
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        <Flex gap={16} align="center">
          <Avatar size={48} src={exercise.coach.avatar} />
          
          {exercise.coach.full_name}
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
                          onClick={() => action.onClick(exercise)}
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
    <AppLayout title="Latihan" authed={props.auth.user} meta={props.meta}>
      <Grid justify="space-between">
        <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
          <Breadcrumbs navList={[{ label: 'Latihan' }]} />
        </Grid.Col>
        
        {['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role) && (
          <Grid.Col span={{ base: 6, xs: 5, sm: 4, md: 3 }}>
            <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Latihan">
              <ActionIcon ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', xs: 'none' }}
                          onClick={() => router.get(route('exercises.create'))}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
            
            <Button display={{ base: 'none', xs: 'block' }} fullWidth leftSection={<IconPlus />} variant="filled" color="gold.1" h={48} radius={32} px={16}
                    styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('exercises.create'))}>
              Tambah Latihan
            </Button>
          </Grid.Col>
        )}
        
        <Grid.Col span={12}>
          <TextInput variant="filled" leftSection={<IconSearch />}
                     styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                     color="gold.1"
                     placeholder="Cari latihan..." onChange={(e) => setAthleteSearch(e.target.value)} />
        </Grid.Col>
      </Grid>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
