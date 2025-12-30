import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";

const NotificationImageGenerator = () => {
  const [formData, setFormData] = useState({
    organizationName:
      "All India Institute of Medical Sciences, Bhubaneswar (AIIMS Bhubaneswar) Recruitment 2025",
    postName: "Assistant Professor",
    postCount: "18",
    lastDate: "20 Jan 2026",
    vacancies: "18",
    logoUrl: "",
    gyapakLogoUrl: "",
    notificationType: "Latest Notification",
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load default gyapak logo on component mount
  useEffect(() => {
    const loadDefaultLogo = async () => {
      try {
        const response = await fetch('/gyapak.png');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result && typeof event.target.result === 'string') {
            setFormData((prev) => ({
              ...prev,
              gyapakLogoUrl: event.target!.result as string,
            }));
          }
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Failed to load default gyapak logo:', error);
      }
    };
    loadDefaultLogo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            logoUrl: event.target!.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };



  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1456;
    canvas.height = 816;

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const dotPositions = [
      [113, 11],
      [133, 11],
      [153, 11],
      [113, 31],
      [133, 31],
      [153, 31],
    ];
    ctx.fillStyle = "#a0616a";
    dotPositions.forEach(([x, y]) => {
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, Math.PI * 2);
      ctx!.fill();
    });

    const rightDots = [
      [1329, 21],
      [1356, 21],
      [1383, 21],
      [1329, 48],
      [1356, 48],
      [1383, 48],
    ];
    rightDots.forEach(([x, y]) => {
      ctx!.fillStyle = "#d4a5a5";
      ctx!.beginPath();
      ctx!.arc(x, y, 5, 0, Math.PI * 2);
      ctx!.fill();
    });

    if (formData.gyapakLogoUrl) {
      const gyapakLogo = new Image();
      gyapakLogo.onload = () => {
        ctx!.drawImage(gyapakLogo, 170, 70, 260, 80);
        drawRestOfImage();
      };
      gyapakLogo.src = formData.gyapakLogoUrl;
    } else {
      ctx.fillStyle = "#8b4a9e";
      ctx.font = "bold 48px Arial";
      ctx.fillText("🎓", 170, 125);

      ctx.font = "bold 52px Arial";
      ctx.fillText("gyapak.in", 220, 125);
      drawRestOfImage();
    }

    function drawRestOfImage() {
      ctx!.fillStyle = "#0d5fb8";
      ctx!.fillRect(728, 69, 434, 79);
      ctx!.fillStyle = "white";
      ctx!.font = "bold 42px Arial";
      ctx!.textAlign = "center";
      ctx!.fillText(formData.notificationType, 728 + 217, 125);
      ctx!.textAlign = "left";

      if (formData.logoUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          ctx!.drawImage(logoImg, 140, 210, 340, 340);
          continueDrawing();
        };
        logoImg.src = formData.logoUrl;
      } else {
        ctx!.strokeStyle = "#8b7355";
        ctx!.lineWidth = 15;
        ctx!.beginPath();
        ctx!.arc(310, 380, 170, 0, Math.PI * 2);
        ctx!.stroke();

        ctx!.fillStyle = "#8b7355";
        ctx!.font = "bold 120px Arial";
        ctx!.textAlign = "center";
        ctx!.fillText("⚕️", 310, 420);

        continueDrawing();
      }

      function continueDrawing() {
  ctx!.fillStyle = "#0d5fb8";
  ctx!.font = "bold 48px Arial";
  ctx!.textAlign = "left";

  const orgName = formData.organizationName;
  const maxWidth = 850;
  const lineHeight = 62;
  const words = orgName.split(" ");
  let line = "";
  let y = 220; // Changed from 200 to 220 to add more space

  words.forEach((word: string, index: number) => {
    const testLine = line + word + " ";
    const metrics = ctx!.measureText(testLine);

    if (metrics.width > maxWidth && line !== "") {
      ctx!.fillText(line, 598, y);
      line = word + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }

    if (index === words.length - 1) {
      ctx!.fillText(line, 598, y);
    }
  });

  // Post name with wrapping - keep "- XX posts" together
  const postY = y + 70;
  ctx!.fillStyle = "#333";
  ctx!.font = "bold 36px Arial";

  const postText = `${formData.postName} - ${formData.postCount} posts`;
  const postMaxWidth = 800; // Width for first line (with emoji)
  const postLineHeight = 50;
  
  // Split by words but keep "- XX posts" together as one unit
  const postWords = postText.split(" ");
  let postLine = "";
  let currentPostY = postY;
  let isFirstPostLine = true;

  for (let index = 0; index < postWords.length; index++) {
    const word = postWords[index];
    
    // Check if this is the dash before post count
    if (word === "-" && index + 2 < postWords.length) {
      // Try to keep "- XX posts" together
      const postCountUnit = `${word} ${postWords[index + 1]} ${postWords[index + 2]}`;
      const testLine = postLine + postCountUnit + " ";
      const metrics = ctx!.measureText(testLine);
      const availableWidth = isFirstPostLine ? postMaxWidth : 850;

      if (metrics.width > availableWidth && postLine !== "") {
        // Print current line and move "- XX posts" to next line
        if (isFirstPostLine) {
          ctx!.fillText("👨‍🔬", 598, currentPostY);
          ctx!.fillText(postLine.trim(), 648, currentPostY);
          isFirstPostLine = false;
        } else {
          ctx!.fillText(postLine.trim(), 648, currentPostY);
        }
        postLine = postCountUnit + " ";
        currentPostY += postLineHeight;
      } else {
        postLine = testLine;
      }
      
      // Skip the next 2 words as we've already processed them
      index += 2;
    } else {
      const testLine = postLine + word + " ";
      const metrics = ctx!.measureText(testLine);
      const availableWidth = isFirstPostLine ? postMaxWidth : 850;

      if (metrics.width > availableWidth && postLine !== "") {
        if (isFirstPostLine) {
          ctx!.fillText("👨‍🔬", 598, currentPostY);
          ctx!.fillText(postLine.trim(), 648, currentPostY);
          isFirstPostLine = false;
        } else {
          ctx!.fillText(postLine.trim(), 648, currentPostY);
        }
        postLine = word + " ";
        currentPostY += postLineHeight;
      } else {
        postLine = testLine;
      }
    }

    // Last word
    if (index === postWords.length - 1) {
      if (isFirstPostLine) {
        ctx!.fillText("👨‍🔬", 598, currentPostY);
        ctx!.fillText(postLine.trim(), 648, currentPostY);
      } else {
        ctx!.fillText(postLine.trim(), 648, currentPostY);
      }
    }
  }

  // Last Date with dynamic positioning
  const lastDateY: number = currentPostY + 65;
  ctx!.fillText("📅", 598, lastDateY);
  ctx!.fillStyle = "#d32f2f";
  ctx!.fillText(`Last Date: ${formData.lastDate}`, 648, lastDateY);

  // Button with dynamic positioning and left alignment
  const buttonY: number = lastDateY + 85;
  const buttonWidth: number = 467;
  const buttonX: number = 598; // Aligned with other text

  const gradient = ctx!.createLinearGradient(
    buttonX,
    buttonY - 30,
    buttonX + buttonWidth,
    buttonY + 30
  );
  gradient.addColorStop(0, "#7c4dff");
  gradient.addColorStop(1, "#9c27b0");

  ctx!.fillStyle = gradient;
  ctx!.beginPath();
  ctx!.roundRect(buttonX, buttonY - 30, buttonWidth, 76, 38);
  ctx!.fill();

  ctx!.fillStyle = "white";
  ctx!.font = "bold 38px Arial";
  ctx!.textAlign = "center";
  ctx!.fillText(
    `Vacancy : ${formData.vacancies} Posts`,
    buttonX + buttonWidth / 2,
    buttonY + 15
  );
  
  // Reset text alignment
  ctx!.textAlign = "left";

  ctx!.fillStyle = "#0d5fb8";
  ctx!.fillRect(0, 705, canvas!.width, 111);

  ctx!.fillStyle = "white";
  ctx!.font = "bold 56px Arial";
  ctx!.textAlign = "center";
  ctx!.fillText("For More info Visit www.gyapak.in", 728, 780);

  if (formData.gyapakLogoUrl) {
    ctx!.globalAlpha = 0.15;
    const watermarkLogo = new Image();
    watermarkLogo.onload = () => {
      const watermarkWidth: number = 1350;
      const watermarkHeight: number = 400;
      const x: number = (canvas!.width - watermarkWidth) / 2;
      const y: number = (canvas!.height - watermarkHeight) / 2 - 50;
      ctx!.drawImage(watermarkLogo, x, y, watermarkWidth, watermarkHeight);
      ctx!.globalAlpha = 1.0;
    };
    watermarkLogo.src = formData.gyapakLogoUrl;
  } else {
    ctx!.fillStyle = "rgba(139, 74, 158, 0.20)";
    ctx!.font = "bold 200px Arial";
    ctx!.textAlign = "center";
    ctx!.fillText("gyapak", canvas!.width / 2, canvas!.height / 2);
  }
}
    }
  };

  const downloadImage = () => {
    generateImage();
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = "notification.png";
      link.href = canvas.toDataURL();
      link.click();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">
              📢 Notification Image Generator
            </h1>
            <p className="text-purple-100 mt-2">
              Create professional notification images for gyapak.in
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notification Type
                </label>
                <select
                  name="notificationType"
                  value={formData.notificationType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="Latest Notification">Latest Notification</option>
                  <option value="Admit Card">Admit Card</option>
                  <option value="Result">Result</option>

                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name & Recruitment Year
                </label>
                <textarea
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  rows={3}
                  placeholder="e.g., All India Institute of Medical Sciences, Bhubaneswar (AIIMS Bhubaneswar) Recruitment 2025"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Post Name
                  </label>
                  <input
                    type="text"
                    name="postName"
                    value={formData.postName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="Assistant Professor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Posts
                  </label>
                  <input
                    type="text"
                    name="postCount"
                    value={formData.postCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    placeholder="18"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Date
                </label>
                <input
                  type="text"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="20 Jan 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Vacancies
                </label>
                <input
                  type="text"
                  name="vacancies"
                  value={formData.vacancies}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload the organization's logo (PNG/JPG)
                </p>
              </div>

              <button
                onClick={downloadImage}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={24} />
                Generate & Download Image
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Preview
              </h3>
              <div className="border-4 border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Click "Generate & Download" to create your notification image
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationImageGenerator;
