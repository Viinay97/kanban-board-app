import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import FilterSortPanel from './FilterSortPanel';
import {
  Add, 
  MoreHoriz, 
  PendingOutlined,
  ContrastOutlined,
  CircleOutlined,
  SignalCellular0Bar,
  SignalCellular1Bar,
  SignalCellular3Bar,
  SignalCellular4Bar,
  Announcement,
  AccountCircle,
} from '@mui/icons-material';

function KanbanBoard() {
  const [tickets, setTickets] = useState(null);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const priorities = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];

  const icons = [
    ['Backlog', <PendingOutlined className='icons2'/>],
    ['Todo', <CircleOutlined className='icons2'/> ],
    ['In progress', <ContrastOutlined className='icons2 progress'/>],
    ['0', <SignalCellular0Bar className='icons2'/>],
    ['1', <SignalCellular1Bar className='icons2'/>],
    ['2', <SignalCellular3Bar className='icons2'/>],
    ['3', <SignalCellular4Bar className='icons2'/>],
    ['4', <Announcement className='icons2 urgent'/>],
  ];

  const iconsMap = new Map(icons);
 
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          const data = await response.json();
          mergeData(data.tickets, data.users);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
  }, []);

  function mergeData(tickets, users) {
    const userMap = {};
    users.forEach(user => {
      userMap[user.id] = user;
    })
    const mergedData = tickets.map(ticket => ({
      ...ticket,
      user: userMap[ticket.userId]
    }));
    setTickets(mergedData);
  }

  function groupTicketsByOption(tickets, option) {
    if (!tickets) return [];
    const grouped = {};
    tickets.forEach(ticket => {
      const key = option === 'userId' ? ticket.user.name : ticket[option];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
    });
    const groupedArray = Object.entries(grouped).map(([key, value]) => ({
        key,
        tickets: value,
    }));
    return groupedArray;
  }

  function sortTickets(groupedTickets, option) {
    if (!groupedTickets) return [];
    groupedTickets = groupedTickets.map(group => ({
          ...group,
          tickets: group.tickets.sort((a, b) => {
            if (option === 'priority') {
              return b.priority - a.priority;
            } else if (option === 'title') {
              return a.title.localeCompare(b.title);
            }
            return 0;
        }),
    }));
    console.log(groupedTickets);
    return groupedTickets;
  }
  

  const groupedTickets = groupTicketsByOption(tickets, groupingOption);
  const sortedTickets = sortTickets(groupedTickets, sortingOption);

  return (
    <div className='content'>
      <div className="header">
        <FilterSortPanel
          groupingOption={groupingOption}
          setGroupingOption={setGroupingOption}
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
        />
      </div>
      <div className="kanban-board">
        {sortedTickets.map(ticketGroup => (
          <div key={ticketGroup.key} className="kanban-column">
            <div className='ticket-title'>
              <div className='title-start'>
                {iconsMap.get(ticketGroup.key) || 
                  <div className="account-circle-container">
                      <AccountCircle className="account"/>
                      <div 
                        className="online-indicator"
                        style={{ 
                          backgroundColor: ticketGroup.tickets.some((ticket) => ticket.user.available)
                          ? 'green'
                          : 'grey'}}
                      >
                      </div>
                  </div>
                }
                <span>{groupingOption === 'priority' ? 
                  priorities[ticketGroup.key] :
                  ticketGroup.key}
                </span>
                <span className='grey-3'>{ticketGroup.tickets.length}</span>
              </div>
              <div className='title-end grey-3'>
                <span><Add className='icons' /></span>
                <span><MoreHoriz className='icons' /></span>
              </div>
            </div>
            {ticketGroup.tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
