import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Button, Flex, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log('evaluation', props)
  const [exerciseEvaluationSearch, setExerciseEvaluationSearch] = useState('')
  const THList = ['#', 'Nama', 'Tempat', 'Tanggal', 'Waktu Mulai', 'Waktu Selesai', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Penilaian',
      icon: <IconEye />,
      onClick: (exerciseEvaluation) => router.get(route('evaluations.show', exerciseEvaluation)),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Penilaian',
      icon: <IconPencil />,
      onClick: (exerciseEvaluation) => router.get(route('evaluations.edit', exerciseEvaluation)),
      color: 'yellow',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
    {
      label: 'Hapus Penilaian',
      icon: <IconTrash />,
      onClick: (exerciseEvaluation) => router.delete(route('evaluations.destroy', exerciseEvaluation)),
      color: 'red',
      disabled: !props.auth.user.role.includes('Pelatih'),
    },
  ]
  const exerciseEvaluationList = props.exercise_evaluations.filter((exerciseEvaluation) => {
    return exerciseEvaluation.exercise.name.toLowerCase().includes(exerciseEvaluationSearch.toLowerCase())
  })
  const TDList = exerciseEvaluationList.map((exerciseEvaluation, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exerciseEvaluation.exercise.name}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exerciseEvaluation.exercise.place}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exerciseEvaluation.exercise.date}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exerciseEvaluation.exercise.start_time}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{exerciseEvaluation.exercise.end_time}</MantineTable.Td>
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
                          onClick={() => action.onClick(exerciseEvaluation)}
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
    <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta}>
      <Stack mb={32}>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian' }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.1"
                       placeholder="Cari latihan..." onChange={(e) => setExerciseEvaluationSearch(e.target.value)} />
            
            {props.auth.user.role.includes('Pelatih') && (
              <>
                <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Penilaian">
                  <ActionIcon ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', sm: 'none' }}
                              onClick={() => router.get(route('evaluations.create'))}>
                    <IconPlus />
                  </ActionIcon>
                </Tooltip>
                
                <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.1" h={48} radius={32} px={16}
                        styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('evaluations.create'))}>
                  Tambah Penilaian
                </Button>
              </>
            )}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.1"
                   placeholder="Cari atlet..." onChange={(e) => exerciseEvaluationSearch(e.target.value)} />
      </Stack>
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
