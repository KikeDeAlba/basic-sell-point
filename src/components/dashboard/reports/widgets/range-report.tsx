import type { sales } from "db/schema"
import { useEffect, useState } from "react"
import { priceFormmater } from "../../sell-point/product-card"
import { AnimatePresence, motion } from "framer-motion"


const getCurrentDateMinurOne = () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
}

export const RangeReport = () => {
    const [dates, setDates] = useState({
        startDate: getCurrentDateMinurOne(),
        endDate: getCurrentDateMinurOne()
    })

    const [currentSales, setSales] = useState<typeof sales.$inferSelect[]>([])

    useEffect(() => {
        fetch('/api/reports/range', {
            method: 'POST',
            body: JSON.stringify(dates)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                setSales(data)
            })
    }, [dates])

    return (
        <article
            className="flex flex-col gap-4 p-4 w-fit shadow-md rounded-md bg-white/30"
        >
            <header
                className="flex justify-between items-center"
            >
                <h2 className="text-xl font-semibold">Range Report</h2>
            </header>

            <div
                className="flex gap-4 items-center"
            >
                <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2"
                    value={dates.startDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                        setDates({
                            ...dates,
                            startDate: new Date(e.target.value)
                        })
                    }}
                />
                <span
                    className="text-2xl font-semibold"
                >-</span>
                <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2"
                    value={dates.endDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                        setDates({
                            ...dates,
                            endDate: new Date(e.target.value)
                        })
                    }}
                />
            </div>

            <AnimatePresence>

                {currentSales.reduce((acc, sale) => acc + sale.total ?? 0, 0) !== 0 && (
                    <motion.div
                        className="flex justify-between items-center gap-4 overflow-hidden"
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: 'auto'
                        }}
                        exit={{
                            height: 0
                        }}
                    >
                        <span
                            className="text-xl font-semibold"
                        >Total: {priceFormmater.format(
                            currentSales.reduce((acc, sale) => acc + sale.total ?? 0, 0)
                        )}
                        </span>

                        <a
                            href={`/print/range-report?startDate=${dates.startDate.toISOString()}&endDate=${dates.endDate.toISOString()}`}
                            target="_blank"
                            className="p-2 bg-blue-500 text-white rounded-md"
                        >
                            Download
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </article>
    )
}