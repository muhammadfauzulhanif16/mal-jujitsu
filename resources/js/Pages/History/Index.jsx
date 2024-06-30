import { AppLayout } from '@/Layouts/AppLayout.jsx'
import { Avatar, Center, Text, Timeline } from '@mantine/core'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { router } from '@inertiajs/core'

const Index = (props) => {
  const [now, setNow] = useState(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <AppLayout title="Riwayat" authed={props.auth.user} meta={props.meta} unreadHistories={props.unread_histories.length}>
      <Center>
        <Timeline color="gold.2" active={props.histories.length} bulletSize={48} lineWidth={4}>
          {props.histories.map((history) => (
            <Timeline.Item
              bg={history.is_read ? undefined : 'gold.10'}
              onMouseEnter={() => {
                if (!history.is_read) {
                  router.put(route('histories.update', history.id))
                }
              }}
              style={{ cursor: 'pointer', borderRadius: 32 }}
              pl={22}
              pt={history.is_read ? 0 : 22}
              pb={history.is_read ? 0 : 22}
              styles={{
                itemTitle: {
                  margin: 0,
                },
                itemBody: {
                  paddingLeft: 32,
                },
              }}
              key={history.id}
              title={history.user.full_name}
              bullet={
                <Avatar
                  size={48}
                  radius="xl"
                  alt={history.user.full_name}
                  src={history.avatar}
                />
              }>
              <Text c="dimmed" size="sm" my={4}>{history.content}</Text>
              
              <Text size="xs" mt={4}>{formatDistanceToNow(new Date(history.created_at), {
                addSuffix: true,
                locale: id,
                includeSeconds: true,
              })}</Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Center>
    </AppLayout>
  )
}

export default Index
