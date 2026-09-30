const RelationshipGraph = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Standards Relationship Map</h1>
        <p className="text-text-secondary">Visual representation of relationships and dependencies between standards.</p>
      </div>

      <div className="card !p-0 overflow-hidden border border-border">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          <div className="flex-2 relative border-b md:border-b-0 md:border-r border-border flex items-center justify-center bg-primary min-h-[300px] w-full md:w-2/3">
            {/* Mock Graph */}
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              {/* Center Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-accent-900 text-white flex items-center justify-center font-semibold z-10 shadow-md text-sm">
                IS 1520
              </div>

              {/* Connected Node 1 */}
              <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-secondary border-2 border-accent text-accent flex items-center justify-center font-semibold z-10 text-xs shadow-sm">
                IS 5120
              </div>

              {/* Connected Node 2 */}
              <div className="absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-secondary border-2 border-border text-text-primary flex items-center justify-center font-semibold z-10 text-xs shadow-sm">
                IS 210
              </div>

              {/* Lines */}
              <svg className="absolute top-0 left-0 w-full h-full z-[1]">
                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="currentColor" className="text-accent" strokeWidth="2" strokeDasharray="4" />
                <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="currentColor" className="text-border" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div className="flex-1 p-6 w-full md:w-1/3 bg-secondary">
            <h2 className="text-xl font-semibold mb-6">IS 5120:2020</h2>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm font-semibold text-text-primary">Relationship</div>
                <div className="text-text-secondary text-sm mt-1">Normative Reference</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Referenced by</div>
                <div className="text-text-secondary text-sm mt-1">IS 1520:2000</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Purpose</div>
                <div className="text-text-secondary text-sm mt-1">Testing requirements and material specifications.</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary mb-2">Evidence</div>
                <div className="bg-primary border-l-4 border-border px-3 py-2 text-sm text-text-secondary italic">
                  "Testing shall be carried out in accordance with IS 5120 for special purpose performance verification..."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationshipGraph;
