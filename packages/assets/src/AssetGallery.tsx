import { useEffect, useState } from "react";

interface AssetItem {
  name: string;
  path: string;
  preview: string;
  type: "image" | "svg" | "svg-colored";
}

interface ToastProps {
  message: string;
  isVisible: boolean;
}

function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-out">
      <div className="bg-green-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </div>
    </div>
  );
}

function AssetCard({
  asset,
  handleCopyPath,
}: {
  asset: AssetItem;
  handleCopyPath: (path: string) => void;
}) {
  // 根据计算调整SVG卡片宽度
  const containerClass =
    asset.type === "image" ? "w-[220px] h-[180px]" : "w-[162px] h-[120px]";

  const cardClass = asset.type === "image" ? "w-[220px]" : "w-[162px]";

  // 根据资源类型使用不同的图片样式
  const imgClass =
    asset.type === "image"
      ? "max-h-full max-w-full object-cover"
      : "h-16 w-16 object-contain";

  // 检查文件名是否以white开头
  const isWhiteIcon = asset.name.toLowerCase().startsWith("white");

  // 为白色图标提供深色背景
  const imgContainerClass = isWhiteIcon
    ? "bg-gray-800 rounded-md flex items-center justify-center"
    : "";

  return (
    <div
      key={asset.path}
      className={`${cardClass} rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer bg-white`}
      onClick={() => handleCopyPath(asset.path)}
    >
      <div
        className={`relative ${containerClass} bg-gray-50 flex items-center justify-center p-3`}
      >
        {asset.preview ? (
          asset.name.toLowerCase().endsWith(".svg") ||
          asset.name.toLowerCase().endsWith(".png") ||
          asset.name.toLowerCase().endsWith(".jpg") ||
          asset.name.toLowerCase().endsWith(".jpeg") ||
          asset.name.toLowerCase().endsWith(".gif") ||
          asset.name.toLowerCase().endsWith(".webp") ? (
            <div className={imgContainerClass}>
              <img src={asset.preview} alt={asset.name} className={imgClass} />
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-lg bg-gray-100 rounded-md">
              {asset.path.split(".").pop()?.toUpperCase()}
            </div>
          )
        ) : (
          <div className="text-red-500 text-xs text-center">
            Error loading preview
          </div>
        )}
      </div>
      <div className="p-3 bg-white">
        <h3
          className="font-medium truncate text-sm text-gray-800"
          title={asset.name}
        >
          {asset.name}
        </h3>
        <div
          className="mt-1 text-xs text-gray-500 truncate"
          title={`@assets/${asset.path}`}
        >
          <code>@assets/{asset.path}</code>
        </div>
      </div>
    </div>
  );
}

function AssetGallery() {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    async function loadAssets() {
      try {
        const assetContext = import.meta.glob<{ default: string }>(
          "./assets/**/*",
          {
            eager: true,
          }
        );

        console.log("Asset context:", Object.keys(assetContext));

        const assetItems: AssetItem[] = Object.entries(assetContext).map(
          ([path, module]) => {
            // Extract proper filename from path
            const name = path.split("/").pop() || "";
            const relativePath = path.replace("./assets/", "");

            // 确定资源类型
            let type: "image" | "svg" | "svg-colored" = "image";
            if (path.includes("/svg/")) {
              type = "svg";
            } else if (path.includes("/svg-colored/")) {
              type = "svg-colored";
            } else if (path.includes("/images/")) {
              type = "image";
            }

            console.log(`Processing asset: ${path}`, {
              name,
              path: relativePath,
              preview: typeof module.default,
              moduleKeys: Object.keys(module),
              type,
            });

            return {
              name,
              path: relativePath,
              preview: module.default,
              type,
            };
          }
        );

        setAssets(assetItems);
      } catch (err) {
        console.error("加载资源失败", err);
      }
    }

    loadAssets();
  }, []);

  const handleCopyPath = (assetPath: string) => {
    const copyText = `@assets/${assetPath}`;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setToast({ message: `已复制: ${copyText}`, visible: true });
        setTimeout(() => setToast({ message: "", visible: false }), 2000);
      })
      .catch((err) => {
        console.error("复制失败:", err);
      });
  };

  // 将资源按类型分组
  const imageAssets = assets.filter((asset) => asset.type === "image");
  const svgAssets = assets.filter((asset) => asset.type === "svg");
  const svgColoredAssets = assets.filter(
    (asset) => asset.type === "svg-colored"
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toast message={toast.message} isVisible={toast.visible} />

      <p className="text-xl font-bold mb-2">资源画廊</p>
      <p className="text-gray-600 mb-6">
        这个画廊展示了所有可用的静态资源，点击图片可复制引用路径。
      </p>

      {assets.length === 0 ? (
        <div className="w-full p-8 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-500">
            未找到资源。请将资源文件放入 src/assets/ 目录。
          </p>
        </div>
      ) : (
        <>
          {/* 彩色SVG资源 - 放在最上面 */}
          {svgColoredAssets.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold mb-4 pb-2 border-b border-gray-100">
                彩色SVG
              </h2>
              <div className="flex flex-wrap gap-4 justify-start">
                {svgColoredAssets.map((asset) => (
                  <AssetCard
                    key={asset.path}
                    asset={asset}
                    handleCopyPath={handleCopyPath}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SVG资源 */}
          {svgAssets.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold mb-4 pb-2 border-b border-gray-100">
                无颜色SVG
              </h2>
              <div className="flex flex-wrap gap-4 justify-start">
                {svgAssets.map((asset) => (
                  <AssetCard
                    key={asset.path}
                    asset={asset}
                    handleCopyPath={handleCopyPath}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 图片资源 */}
          {imageAssets.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold mb-4 pb-2 border-b border-gray-100">
                图片资源
              </h2>
              <div className="flex flex-wrap gap-6">
                {imageAssets.map((asset) => (
                  <AssetCard
                    key={asset.path}
                    asset={asset}
                    handleCopyPath={handleCopyPath}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AssetGallery;
