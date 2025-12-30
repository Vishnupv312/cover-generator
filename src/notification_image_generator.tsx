import React, { useState, useRef } from "react";
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
  });

  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          logoUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGyapakLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          gyapakLogoUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
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
      ctx.fillStyle = "#d4a5a5";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (formData.gyapakLogoUrl) {
      const gyapakLogo = new Image();
      gyapakLogo.onload = () => {
        ctx.drawImage(gyapakLogo, 170, 70, 260, 80);
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
      ctx.fillStyle = "#0d5fb8";
      ctx.fillRect(728, 69, 434, 79);
      ctx.fillStyle = "white";
      ctx.font = "bold 42px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Latest Notification", 728 + 217, 125);
      ctx.textAlign = "left";

      if (formData.logoUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          ctx.drawImage(logoImg, 140, 210, 340, 340);
          continueDrawing();
        };
        logoImg.src = formData.logoUrl;
      } else {
        ctx.strokeStyle = "#8b7355";
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.arc(310, 380, 170, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#8b7355";
        ctx.font = "bold 120px Arial";
        ctx.textAlign = "center";
        ctx.fillText("⚕️", 310, 420);

        continueDrawing();
      }

      function continueDrawing() {
        ctx.fillStyle = "#0d5fb8";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "left";

        const orgName = formData.organizationName;
        const maxWidth = 850;
        const lineHeight = 62;
        const words = orgName.split(" ");
        let line = "";
        let y = 240;

        words.forEach((word, index) => {
          const testLine = line + word + " ";
          const metrics = ctx.measureText(testLine);

          if (metrics.width > maxWidth && line !== "") {
            ctx.fillText(line, 598, y);
            line = word + " ";
            y += lineHeight;
          } else {
            line = testLine;
          }

          if (index === words.length - 1) {
            ctx.fillText(line, 598, y);
          }
        });

        const postY = y + 90;
        ctx.fillStyle = "#333";
        ctx.font = "bold 36px Arial";
        ctx.fillText("👨‍🔬", 705, postY);
        ctx.fillText(
          `${formData.postName} - ${formData.postCount} posts`,
          755,
          postY
        );

        ctx.fillText("📅", 705, postY + 65);
        ctx.fillStyle = "#d32f2f";
        ctx.fillText(`Last Date: ${formData.lastDate}`, 755, postY + 65);

        const buttonY = postY + 150;
        const gradient = ctx.createLinearGradient(
          783,
          buttonY - 30,
          1250,
          buttonY + 30
        );
        gradient.addColorStop(0, "#7c4dff");
        gradient.addColorStop(1, "#9c27b0");

        const buttonWidth = 467;
        const buttonX = (canvas.width - buttonWidth) / 2;

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(buttonX, buttonY - 30, buttonWidth, 76, 38);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 38px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          `Vacancy : ${formData.vacancies} Posts`,
          canvas.width / 2,
          buttonY + 15
        );

        ctx.fillStyle = "#0d5fb8";
        ctx.fillRect(0, 705, canvas.width, 111);

        ctx.fillStyle = "white";
        ctx.font = "bold 56px Arial";
        ctx.fillText("For More info Visit www.gyapak.in", 728, 780);

        if (formData.gyapakLogoUrl) {
          ctx.globalAlpha = 0.2;
          const watermarkLogo = new Image();
          watermarkLogo.onload = () => {
            const watermarkWidth = 1000;
            const watermarkHeight = 300;
            const x = (canvas.width - watermarkWidth) / 2;
            const y = (canvas.height - watermarkHeight) / 2 - 50;
            ctx.drawImage(watermarkLogo, x, y, watermarkWidth, watermarkHeight);
            ctx.globalAlpha = 1.0;
          };
          watermarkLogo.src = formData.gyapakLogoUrl;
        } else {
          ctx.fillStyle = "rgba(139, 74, 158, 0.20)";
          ctx.font = "bold 200px Arial";
          ctx.textAlign = "center";
          ctx.fillText("gyapak", canvas.width / 2, canvas.height / 2);
        }
      }
    }
  };

  const downloadImage = () => {
    generateImage();
    setTimeout(() => {
      const canvas = canvasRef.current;
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
                  Gyapak Logo (Required)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGyapakLogoUpload}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload the gyapak.in logo (PNG recommended)
                </p>
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
                  rows="3"
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
