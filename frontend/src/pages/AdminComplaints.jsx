import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [complaintsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:8081/api/admin/complaints'),
        axios.get('http://localhost:8081/api/admin/users')
      ]);

      if (complaintsRes.data.success) {
        setComplaints(complaintsRes.data.data);
      }
      
      if (usersRes.data.success) {
        // Filter only users with AGENT role
        const agentUsers = usersRes.data.data.filter(u => u.role === 'AGENT');
        setAgents(agentUsers);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignAgent = async (complaintId, agentId) => {
    if (!agentId) return;
    
    setAssigningId(complaintId);
    try {
      const res = await axios.post(`http://localhost:8081/api/admin/complaints/${complaintId}/assign/${agentId}`);
      if (res.data.success) {
        // Update the local state
        setComplaints(complaints.map(c => c.id === complaintId ? res.data.data : c));
      }
    } catch (error) {
      console.error("Error assigning complaint:", error);
      alert("Failed to assign agent");
    } finally {
      setAssigningId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      OPEN: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      RESOLVED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800'
    };
    return `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage All Complaints</h2>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No complaints found in the system.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign Agent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{complaint.id} - {complaint.title}</div>
                      <div className="text-sm text-gray-500">{complaint.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{complaint.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(complaint.status)}>
                        {complaint.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint.status === 'RESOLVED' || complaint.status === 'CLOSED' ? (
                        <span>Assigned to: {complaint.agentName}</span>
                      ) : (
                        <select
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border"
                          value={complaint.agentId || ""}
                          onChange={(e) => handleAssignAgent(complaint.id, e.target.value)}
                          disabled={assigningId === complaint.id}
                        >
                          <option value="">Select Agent...</option>
                          {agents.map(agent => (
                            <option key={agent.id} value={agent.id}>{agent.name}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
