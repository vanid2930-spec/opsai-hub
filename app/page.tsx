import React from 'react';
import { supabase } from '@/lib/supabase';

// Tell Next.js to always fetch fresh data from the database (no caching old rows)
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // Fetch live tickets from your Supabase cloud database
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select('*')
    .order('id', { ascending: true });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-6 w-6 bg-blue-500 rounded-md animate-pulse"></div>
            <h1 className="text-xl font-bold tracking-wider text-white">OpsAI Hub</h1>
          </div>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2.5 rounded-lg bg-slate-800 text-white font-medium">Dashboard</a>
            <a href="#" className="block px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition">AI Agents</a>
            <a href="#" className="block px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition">Knowledge Base</a>
            <a href="#" className="block px-4 py-2.5 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition">Settings</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
          Status: <span className="text-emerald-400 font-semibold">● Live Engine</span>
        </div>
      </aside>

      {/* Main Operational Window */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white">Operations Center</h2>
            <p className="text-sm text-slate-400">Monitor autonomous customer support queues and AI actions.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition text-sm">
            Sync New Data
          </button>
        </header>

        {/* Dashboard Grid Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Tickets</h3>
            {/* Real Counter: Reads the exact array size from Supabase */}
            <p className="text-3xl font-bold text-white mt-2">{tickets?.length || 0}</p>
            <span className="text-xs text-emerald-400 mt-1 block">● Live Connected</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">AI Resolution Rate</h3>
            <p className="text-3xl font-bold text-white mt-2">84.6%</p>
            <span className="text-xs text-blue-400 mt-1 block">Target: 80.0% achieved</span>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Avg Response Time</h3>
            <p className="text-3xl font-bold text-white mt-2">1.8s</p>
            <span className="text-xs text-slate-500 mt-1 block">Database pipeline optimal</span>
          </div>
        </div>

        {/* Live Simulation Queue */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Pending AI Actions (Human-in-the-Loop)</h3>
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-slate-900/50 px-4 py-3 border-b border-slate-800 text-xs font-semibold uppercase text-slate-400 grid grid-cols-4 gap-4">
              <div>Customer Problem</div>
              <div>AI Proposed Action</div>
              <div>Confidence</div>
              <div className="text-right">Decision</div>
            </div>

            {/* Dynamically loops over your Supabase database rows */}
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket: any) => (
                <div key={ticket.id} className="p-4 grid grid-cols-4 gap-4 items-center border-b border-slate-800 text-sm">
                  <div className="font-medium text-slate-200">"{ticket.problem}"</div>
                  <div className="text-slate-400">{ticket.proposed_action}</div>
                  <div className="text-emerald-400 font-mono font-bold">{ticket.confidence}%</div>
                  <div className="text-right space-x-2">
                    <button className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md text-xs font-medium hover:bg-emerald-500/20 transition">Approve</button>
                    <button className="bg-rose-500/10 text-rose-400 px-3 py-1 rounded-md text-xs font-medium hover:bg-rose-500/20 transition">Reject</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                No active operational tickets found in the database.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

