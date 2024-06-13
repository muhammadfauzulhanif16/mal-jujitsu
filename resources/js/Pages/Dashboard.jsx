import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Breadcrumbs } from '@/Components/Breadcrumbs.jsx'
import { Blockquote, Box, Grid, Group, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconCalendar, IconClipboardText, IconMedal, IconReport, IconReportAnalytics, IconUser } from '@tabler/icons-react'
import { AreaChart, BarChart } from '@mantine/charts'
import { useState } from 'react'

const Dashboard = (props) => {
  const [exerciseTime, setExerciseTime] = useState(`Tahunan (${new Date().getFullYear()})`)
  const [tournamentTime, setTournamentTime] = useState(`Tahunan (${new Date().getFullYear()})`)
  
  console.log(props)
  
  function format(dataList) {
    return [
      {
        time: `Tahunan (${new Date().getFullYear()})`,
        dataList: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month, index) => {
          const currentYear = new Date().getFullYear()
          const filteredExercises = dataList.filter(data => {
            const date = new Date(data.date)
            return date.getMonth() === index && date.getFullYear() === currentYear
          })
          return {
            name: month,
            'Total': filteredExercises.length,
          }
        }),
      },
      {
        time: `Bulanan (${new Date().getMonth()})`,
        dataList: [...Array(5)].map((_, index) => {
          const currentDate = new Date()
          const currentMonth = currentDate.getMonth()
          const currentYear = currentDate.getFullYear()
          const filteredExercises = dataList.filter(data => {
            const date = new Date(data.date)
            const { weekOfMonth, monthOfYear, year } = {
              weekOfMonth: Math.floor(date.getDate() / 7),
              monthOfYear: date.getMonth(),
              year: date.getFullYear(),
            }
            return weekOfMonth === index && monthOfYear === currentMonth && year === currentYear
          })
          return {
            name: index + 1,
            'Total': filteredExercises.length,
          }
        }),
      },
      {
        time: `Mingguan (${Math.ceil(new Date().getDate() / 7)})`,
        dataList: [...Array(7)].map((_, index) => {
          const currentDate = new Date()
          const filteredExercises = dataList.filter(data => {
            const date = new Date(data.date)
            const dayOfWeek = date.getDay()
            const weekOfMonth = Math.floor(date.getDate() / 7)
            const monthOfYear = date.getMonth()
            const year = date.getFullYear()
            return dayOfWeek === index && weekOfMonth === Math.floor(currentDate.getDate() / 7) && monthOfYear === currentDate.getMonth() && year === currentDate.getFullYear()
          })
          return {
            name: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][index],
            'Total': filteredExercises.length,
          }
        }),
      },
    ]
  }
  
  const colorList = ['red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange']
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  
  const colors = shuffleArray(colorList)
  
  const statList = [
    {
      icon: <IconUser />,
      label: 'pelatih',
      total: props.coaches.length,
      color: colors[0],
      description: 'orang',
    },
    {
      icon: <IconUser />,
      label: 'atlet',
      total: props.athletes.length,
      color: colors[1],
      description: 'orang',
    },
    {
      icon: <IconClipboardText />,
      label: 'latihan',
      total: props.exercises.length,
      color: colors[2],
      description: 'kali',
    },
    {
      icon: <IconMedal />,
      label: 'pertandingan',
      total: props.tournaments.length,
      color: colors[3],
      description: 'kali',
    },
    {
      icon: <IconReportAnalytics />,
      label: 'penilaian',
      total: props.evaluations.length,
      color: colors[4],
      description: `dari ${props.exercises.length} latihan`,
    },
    {
      icon: <IconReport />,
      label: 'laporan',
      total: 0,
      description: 'orang',
      color: colors[5],
    },
  ]
  
  return (
    <AppLayout title="Beranda" authed={props.auth.user} meta={props.meta}>
      <Box pb={54}>
        <Breadcrumbs navList={[{ label: 'Beranda' }]} />
      </Box>
      
      <Stack gap={32}>
        <SimpleGrid cols={{
          base: 1,
          xs: 2,
          sm: 3,
          lg: 6,
        }} spacing={24}>
          {statList.map((stat, id, index) => (
            <Blockquote key={id} color={stat.color} radius={20} icon={stat.icon} styles={{ root: { padding: 32 } }}>
              <Title mb={16} fz={12} c="neutral.5">{stat.label.toUpperCase()}</Title>
              <Title fz={20}>{stat.total}</Title>
              <Text fz={14} c="neutral.5">{stat.description}</Text>
            </Blockquote>
          ))}
        </SimpleGrid>
        
        <Grid gutter={32}>
          <Grid.Col span={8}>
            <Stack gap={32}>
              <Stack p={32} gap={32} style={{
                borderRadius: 20,
                border: '1px solid #dcdcdc',
              }}>
                <Group justify="space-between">
                  <Title fz={20} c="neutral.2">Latihan</Title>
                  
                  <Select
                    withAsterisk
                    variant="filled"
                    styles={{
                      label: { marginBottom: 8 },
                      input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                      section: { marginLeft: 0, width: 48, height: 48 },
                      error: { marginTop: 8 },
                    }}
                    leftSection={<IconCalendar />}
                    placeholder="Pilih waktu..."
                    checkIconPosition="right"
                    onChange={(value) => setExerciseTime(value)}
                    value={exerciseTime}
                    allowDeselect={false}
                    data={[`Tahunan (${new Date().getFullYear()})`, `Bulanan (${new Date().getMonth()})`, `Mingguan (${Math.ceil(new Date().getDate() / 7)})`]}
                  />
                </Group>
                
                <AreaChart
                  h={320}
                  tickLine="xy"
                  gridAxis="xy"
                  data={format(props.exercises).filter(item => item.time === exerciseTime)[0].dataList}
                  dataKey="name"
                  series={[{ name: 'Total', color: colorList[Math.floor(Math.random() * colorList.length)] }]}
                  curveType="bump"
                  // connectNulls
                  xAxisLabel={exerciseTime === `Tahunan (${new Date().getFullYear()})` ? 'Bulan' : exerciseTime === `Bulanan (${new Date().getMonth()})` ? 'Minggu' : 'Hari'}
                  yAxisLabel={`Total : ${format(props.exercises).filter(item => item.time === exerciseTime)[0].dataList.reduce((total, item) => total + item.Total, 0)} Latihan`}
                />
              </Stack>
              
              <Stack p={32} gap={32} style={{
                borderRadius: 20,
                border: '1px solid #dcdcdc',
              }}>
                <Group justify="space-between">
                  <Title fz={20} c="neutral.2">Pertandingan</Title>
                  
                  <Select
                    withAsterisk
                    allowDeselect={false}
                    variant="filled"
                    styles={{
                      label: { marginBottom: 8 },
                      input: { height: 48, borderRadius: 32, paddingLeft: 50, paddingRight: 16 },
                      section: { marginLeft: 0, width: 48, height: 48 },
                      error: { marginTop: 8 },
                    }}
                    leftSection={<IconCalendar />}
                    placeholder="Pilih waktu..."
                    checkIconPosition="right"
                    value={tournamentTime}
                    onChange={(value) => setTournamentTime(value)}
                    data={[`Tahunan (${new Date().getFullYear()})`, `Bulanan (${new Date().getMonth()})`, `Mingguan (${Math.ceil(new Date().getDate() / 7)})`]}
                  />
                </Group>
                
                <AreaChart
                  h={320}
                  tickLine="xy"
                  gridAxis="xy"
                  data={format(props.tournaments).filter(item => item.time === tournamentTime)[0].dataList}
                  dataKey="name"
                  series={[{ name: 'Total', color: colorList[Math.floor(Math.random() * colorList.length)] }]}
                  curveType="bump"
                  xAxisLabel={tournamentTime === `Tahunan (${new Date().getFullYear()})` ? 'Bulan' : tournamentTime === `Bulanan (${new Date().getMonth()})` ? 'Minggu' : 'Hari'}
                  yAxisLabel={`Total : ${format(props.tournaments).filter(item => item.time === tournamentTime)[0].dataList.reduce((total, item) => total + item.Total, 0)} Pertandingan`}
                />
              </Stack>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Stack p={32} h="100%" gap={32} style={{
              borderRadius: 20,
              border: '1px solid #dcdcdc',
            }}>
              <Title fz={20} c="neutral.2">Peringkat</Title>
              
              <BarChart
                h="100%"
                withLegend
                xAxisLabel="Atlet"
                yAxisLabel="Total Medali"
                data={props.athletes
                  .sort((a, b) => {
                    if (b.total_medals === a.total_medals) {
                      return b.goldMedals - a.goldMedals
                    }
                    return b.total_medals - a.total_medals
                  })
                  .slice(0, 3)
                  .map((athlete, index) => ({
                    name: `${['🥇', '🥈', '🥉'][index]} ${athlete.user.full_name}`,
                    'Emas': athlete.gold_medals,
                    'Perak': athlete.silver_medals,
                    'Perunggu': athlete.bronze_medals,
                  }))}
                tickLine="xy"
                gridAxis="xy"
                dataKey="name"
                series={[{
                  name: 'Emas', color: colorList[Math.floor(Math.random() * colorList.length)],
                }, {
                  name: 'Perak', color: colorList[Math.floor(Math.random() * colorList.length)],
                }, {
                  name: 'Perunggu', color: colorList[Math.floor(Math.random() * colorList.length)],
                }]}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </AppLayout>
  )
}

export default Dashboard
