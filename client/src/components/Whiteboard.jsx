/**
 * Whiteboard Component
 * Collaborative drawing canvas with brush and eraser tools
 * Professor can draw, students see in real-time via Socket.io
 */
import { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser } from 'lucide-react';

const Whiteboard = ({ socket, activityCode, canDraw = false }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('brush'); // 'brush' or 'eraser'
    const [brushSize, setBrushSize] = useState(5);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set fixed canvas resolution (same for professor and student)
        canvas.width = 1200;
        canvas.height = 600;

        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Listen for initial canvas state (for new joiners)
        socket.on('canvas_state', (data) => {
            if (data.activityCode === activityCode && data.lines) {
                // Redraw all stored lines
                data.lines.forEach(line => {
                    drawLine(ctx, line.x1, line.y1, line.x2, line.y2, line.color, line.size);
                });
            }
        });

        // Listen for draw events from server
        socket.on('draw_line', (data) => {
            if (data.activityCode === activityCode) {
                drawLine(ctx, data.x1, data.y1, data.x2, data.y2, data.color, data.size);
            }
        });

        socket.on('clear_canvas', (data) => {
            if (data.activityCode === activityCode) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        });

        // Function to request canvas state
        const requestState = () => {
            socket.emit('request_canvas_state', { activityCode });
        };

        // Request state after socket is connected
        if (socket.connected) {
            requestState();
        } else {
            socket.on('connect', requestState);
        }

        return () => {
            socket.off('canvas_state');
            socket.off('draw_line');
            socket.off('clear_canvas');
            socket.off('connect', requestState);
        };
    }, [socket, activityCode]);

    /**
     * Draw a line on the canvas
     */
    const drawLine = (ctx, x1, y1, x2, y2, color, size) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    };

    /**
     * Get mouse position relative to canvas
     */
    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    /**
     * Handle mouse down - start drawing
     */
    const handleMouseDown = (e) => {
        if (!canDraw) return;
        setIsDrawing(true);
        const pos = getMousePos(e);
        setLastPos(pos);
    };

    /**
     * Handle mouse move - draw line
     */
    const handleMouseMove = (e) => {
        if (!canDraw || !isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const pos = getMousePos(e);

        const color = tool === 'eraser' ? '#ffffff' : '#000000';
        const size = tool === 'eraser' ? brushSize * 3 : brushSize;

        // Draw locally
        drawLine(ctx, lastPos.x, lastPos.y, pos.x, pos.y, color, size);

        // Send to server for other clients
        socket.emit('draw_line', {
            activityCode,
            x1: lastPos.x,
            y1: lastPos.y,
            x2: pos.x,
            y2: pos.y,
            color,
            size
        });

        setLastPos(pos);
    };

    /**
     * Handle mouse up - stop drawing
     */
    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    /**
     * Clear the entire canvas
     */
    const clearCanvas = () => {
        if (!canDraw) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        socket.emit('clear_canvas', { activityCode });
    };

    return (
        <div className="whiteboard-container">
            {canDraw && (
                <div className="whiteboard-toolbar">
                    <button
                        onClick={() => setTool('brush')}
                        className={`tool-btn ${tool === 'brush' ? 'active' : ''}`}
                        title="Brush"
                    >
                        <Pencil size={20} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                        title="Eraser"
                    >
                        <Eraser size={20} />
                    </button>

                    <div className="size-control">
                        <label>Size:</label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={brushSize}
                            onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        />
                        <span>{brushSize}px</span>
                    </div>

                    <button onClick={clearCanvas} className="clear-btn">
                        Clear
                    </button>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="whiteboard-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: canDraw ? 'crosshair' : 'default' }}
            />

            {!canDraw && (
                <div className="whiteboard-view-only">
                    View Only
                </div>
            )}
        </div>
    );
};

export default Whiteboard;
