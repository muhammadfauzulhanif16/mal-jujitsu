import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Button, Divider, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconEye, IconPlus, IconSearch } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'

const Index = (props) => {
  console.log(props)
  const [athleteSearch, setAthleteSearch] = useState('')
  const THList = ['#', 'Nama Atlet', 'Sistem Pertandingan', 'Aksi']
  const actionList = [
    {
      label: 'Daftar Penilaian Latihan',
      icon: <IconEye />,
      onClick: (evaluation) => router.get(route('evaluations.users.index', {
        user: evaluation.athlete,
      })),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    // {
    //   label: 'Ubah Atlet',
    //   icon: <IconPencil />,
    //   onClick: (exercise) => router.get(route('exercises.edit', exercise.id)),
    //   color: 'yellow',
    //   disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    // },
    // {
    //   label: 'Hapus Atlet',
    //   icon: <IconTrash />,
    //   onClick: (exercise) => router.delete(route('evaluations.destroy', exercise.id)),
    //   color: 'red',
    //   disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    // },
  ]
  const evaluationList = props.evaluations.filter((evaluation) => {
    return evaluation.athlete.full_name.toLowerCase().includes(athleteSearch.toLowerCase())
  })
  const TDList = evaluationList.map((evaluation, id) => (
    <MantineTable.Tr h={64} key={id}>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>{id + 1}</MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {evaluation.athlete.full_name}
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {evaluation.athlete.role}
      </MantineTable.Td>
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
                          onClick={() => action.onClick(evaluation)}
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
    <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta}>
      <Stack>
        <Group w="100%" justify="space-between">
          <Breadcrumbs navList={[{ label: 'Penilaian' }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.1"
                       placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
            
            {['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role) && (
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
                   placeholder="Cari atlet..." onChange={(e) => setAthleteSearch(e.target.value)} />
      </Stack>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default Index
