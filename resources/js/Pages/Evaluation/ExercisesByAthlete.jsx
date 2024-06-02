import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { ActionIcon, Button, Divider, Group, Stack, Table as MantineTable, TextInput, Tooltip } from '@mantine/core'
import { IconCalendar, IconEye, IconPencil, IconSearch, IconTrash } from '@tabler/icons-react'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { router } from '@inertiajs/core'
import { useState } from 'react'
import { Table } from '@/Components/Table.jsx'
import { DatePickerInput } from '@mantine/dates'

const ExercisesByAthlete = (props) => {
  console.log(props)
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseDate, setExerciseDate] = useState('')
  const THList = ['#', 'Nama Latihan', 'Tempat Latihan', 'Tanggal Latihan', 'Aksi']
  const actionList = [
    {
      label: 'Rincian Penilaian',
      icon: <IconEye />,
      onClick: (exercise) => router.get(route('evaluations.show', {
        user: props.athlete,
        exercise: exercise,
      })),
      color: 'blue',
      // disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Ubah Penilaian',
      icon: <IconPencil />,
      onClick: (exercise) => router.get(route('evaluations.edit', {
        user: props.athlete,
        exercise: exercise,
      })),
      color: 'yellow',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
    {
      label: 'Hapus Penilaian',
      icon: <IconTrash />,
      onClick: (exercise) => router.delete(route('evaluations.destroy', {
        user: props.athlete,
        exercise: exercise,
      })),
      color: 'red',
      disabled: !['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role),
    },
  ]
  const exerciseList = props.exercises?.filter((exercise) => {
    const nameCondition = !exerciseName || exercise.name.toLowerCase().includes(exerciseName.toLowerCase())
    const dateCondition = !exerciseDate || exercise.evaluation_time.split(' ')[0].toLowerCase().includes(exerciseDate.toLowerCase())
    return nameCondition && dateCondition
  })
  
  const TDList = exerciseList?.map((exercise, id) => (
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
        style={{ whiteSpace: 'nowrap' }}>
        {exercise.place}
      </MantineTable.Td>
      <MantineTable.Td
        px={16} py={0}
        style={{ whiteSpace: 'nowrap' }}>
        {exercise.evaluation_time}
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
    <AppLayout title="Penilaian" authed={props.auth.user} meta={props.meta}>
      <Stack>
        <Group w="100%" justify="space-between">
          <Breadcrumbs
            navList={[{ label: 'Penilaian', route: 'evaluations.index' }, { label: props.athlete.full_name, route: 'evaluations.users.index' }]} />
          
          <Group>
            <TextInput display={{ base: 'none', xs: 'block' }} w={240} variant="filled" leftSection={<IconSearch />}
                       styles={{
                         input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 },
                         section: { marginLeft: 0, width: 48, height: 48 },
                       }}
                       color="gold.1"
                       placeholder="Cari nama latihan..." onChange={(e) => setExerciseName(e.target.value)} />
            
            <DatePickerInput locale="id" monthsListFormat="MMMM" w={240} clearable allowDeselect firstDayOfWeek={0} variant="filled"
                             valueFormat="dddd, D MMMM YYYY" leftSection={<IconCalendar />}
                             placeholder="Cari tanggal latihan..."
                             styles={{
                               label: { marginBottom: 8 },
                               input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                               section: { marginLeft: 0, width: 48, height: 48 },
                               error: { marginTop: 8 },
                               calendarHeader: { height: 48 },
                               calendarHeaderControl: { height: 48, width: 48, borderRadius: 32 },
                             }} onChange={(value) => {
              if (value) {
                const date = new Date(value)
                const day = String(date.getDate()).padStart(2, '0')
                const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
                const year = date.getFullYear()
                
                setExerciseDate(`${day}-${month}-${year}`)
              } else {
                setExerciseDate('')
              }
            }}
            />
            
            {/*{['Pelatih Teknik', 'Pelatih Fisik'].includes(props.auth.user.role) && (*/}
            {/*  <>*/}
            {/*    <Tooltip style={{ borderRadius: 32, padding: '.5rem 1rem' }} label="Tambah Penilaian">*/}
            {/*      <ActionIcon ml="auto" h={48} w={48} color="gold.1" radius={32} display={{ base: 'block', sm: 'none' }}*/}
            {/*                  onClick={() => router.get(route('evaluations.create'))}>*/}
            {/*        <IconPlus />*/}
            {/*      </ActionIcon>*/}
            {/*    </Tooltip>*/}
            {/*    */}
            {/*    <Button display={{ base: 'none', sm: 'block' }} w={240} leftSection={<IconPlus />} variant="filled" color="gold.1" h={48} radius={32} px={16}*/}
            {/*            styles={{ section: { marginRight: 12 } }} onClick={() => router.get(route('evaluations.create'))}>*/}
            {/*      Tambah Penilaian*/}
            {/*    </Button>*/}
            {/*  </>*/}
            {/*)}*/}
          </Group>
        </Group>
        
        <TextInput w="100%" display={{ base: 'block', xs: 'none' }} variant="filled" leftSection={<IconSearch />}
                   styles={{ input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 14 }, section: { marginLeft: 0, width: 48, height: 48 } }}
                   color="gold.1"
                   placeholder="Cari atlet..." onChange={(e) => setExerciseName(e.target.value)} />
      </Stack>
      
      <Divider my={32} />
      
      <Table thList={THList} tdList={TDList} />
    </AppLayout>
  )
}

export default ExercisesByAthlete
