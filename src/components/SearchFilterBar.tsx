import { useProductsStore } from "@/store/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { ProductStatus, ProductType } from "@/lib/types";

export default function SearchFilterBar() {
    const filter    = useProductsStore(s => s.filter);
    const setFilter = useProductsStore(s => s.setFilter);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="space-y-1">
                <Label>Search Name</Label>
                <Input placeholder="Search by name..." value={filter.query}
                    onChange={(e) => setFilter({ query: e.target.value })}/>
            </div>

            <div className="space-y-1">
                <Label>Product ID</Label>
                <Input placeholder="e.g. P-1001" value={filter.byId}
                    onChange={(e) => setFilter({ byId: e.target.value })}/>
            </div>

            <div className="space-y-1">
                <Label>Type</Label>
                <Select value={filter.type} onValueChange={(v) => setFilter({ type: v as ProductType | 'all' })}>
                    <SelectTrigger><SelectValue placeholder="All"/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="collar">Collar</SelectItem>
                        <SelectItem value="feeder">Feeder</SelectItem>
                        <SelectItem value="toy">Toy</SelectItem>
                        <SelectItem value="accessory">Accessory</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Status</Label>
                <Select value={filter.status} onValueChange={(v) => setFilter({ status: v as ProductStatus | 'all' })}>
                    <SelectTrigger><SelectValue placeholder='All'/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Price Range</Label>
                <div className="px-1 my-2">
                    <Slider
                        min={0}
                        max={2000}
                        step={50}
                        value={[filter.priceMin, filter.priceMax]}
                        onValueChange={([min, max]) =>
                        setFilter({ priceMin: min, priceMax: max })
                        }
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        {filter.priceMin} – {filter.priceMax} THB
                    </p>
                </div>
            </div>
        </div>
    )
}