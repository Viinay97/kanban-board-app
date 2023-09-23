import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import FilterSortPanel from './FilterSortPanel';

function KanbanBoard() {
  const [tickets, setTickets] = useState(null);
  const [users, setUsers] = useState(null);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const priorities = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'];
 
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets); 
        setUsers(data.users);
        console.log(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
}, []);
  

  function groupTicketsByOption(tickets, option) {
    if (!tickets) return [];
    // Initialize an empty object to hold the grouped tickets
  const grouped = {};

  // Iterate through the tickets and group them by the selected option
  tickets.forEach(ticket => {
    const key = ticket[option]; // 'status', 'user', or 'priority'
    
    // If the key doesn't exist in the grouped object, create an empty array for it
    if (!grouped[key]) {
      grouped[key] = [];
    }

    // Push the ticket into the corresponding group
    grouped[key].push(ticket);
  });

  // Convert the grouped object into an array of objects
  const groupedArray = Object.entries(grouped).map(([key, value]) => ({
    key, // The option value (e.g., 'Open', 'In Progress', etc.)
    tickets: value, // Array of tickets belonging to this group
  }));

  return groupedArray;
}

  function sortTickets(groupedTickets, option) {
    if (!groupedTickets) return [];
    return groupedTickets.map(group => ({
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
  }
  
  // Group tickets based on the selected option
  const groupedTickets = groupTicketsByOption(tickets, groupingOption);

  // Sort grouped tickets based on the selected sorting option
  const sortedTickets = sortTickets(groupedTickets, sortingOption);
  return (
    <div>
      <h1>Kanban Board</h1>
      <FilterSortPanel
        groupingOption={groupingOption}
        setGroupingOption={setGroupingOption}
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
      />
      <div className="kanban-board">
        {sortedTickets.map(ticketGroup => (
          <div key={ticketGroup.key} className="kanban-column">
            <h2>{groupingOption === 'priority' ? 
                priorities[ticketGroup.key] :
                ticketGroup.key}
            </h2>
            {ticketGroup.tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
